    const User = require("../models/User")
    const crypto = require("crypto");
    const jwt = require("jsonwebtoken");

    const sendEmail = require("../utils/sendEmail");
    const { generateAccessToken , generateRefreshToken } = require("../utils/tokenUtils");


    const registerUser = async ({ name, email, password }) => {

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            throw new Error("User already registered");
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        console.log(user);

        return {
            message: "User registered",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        };
        console.log("STEP 2");
        
    };

    const loginUser = async ({ email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not registered");
        }

        const isMatched = await user.comparePassword(password);

        if (!isMatched) {
            throw new Error("Invalid credentials");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        return {
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        };
    };

    const refreshTokenService = async (incomingRefreshToken) => {

        if (!incomingRefreshToken) {
            throw new Error("Refresh token not provided");
        }

        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_SECRET);

        const user = await User.findById(decoded.id);

        if(!user){
            throw new Error("User not found");
        }

        if(user.refreshToken !== incomingRefreshToken){
            throw new Error("Invalid refresh token");
        }

        const newAccessToken = generateAccessToken(user);

        return {
            accessToken: newAccessToken,
        };

    }

    const forgotPasswordService = async (email) => {
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            throw new Error("User not found");
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

        const message = `You requested for password reset. Click on the link to reset your password: ${resetUrl}`;

        await sendEmail({
            email: user.email,
            subject: "Password Reset",
            message,
        });

        return {
            message: "Reset email sent successfully",
        };
    };

    const resetPasswordService = async (token, password) => {
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            throw new Error("Invalid or expired token");
        }

        user.password = password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return {
            message: "Password reset successfully",
        };
    };

    const logoutUser = async (incomingRefreshToken) => {

        if (!incomingRefreshToken) {
            throw new Error("Refresh token not provided");
        }

        const user = await User.findOne({ refreshToken: incomingRefreshToken });

        if (!user) {
            throw new Error("User not found");
        }
        
        if(user){
            user.refreshToken = undefined;
            await user.save();
        }

        return {
            message: "Logout successful",
        }

    }

    module.exports = {
        registerUser,
        loginUser,
        refreshTokenService,
        forgotPasswordService,
        resetPasswordService,
        logoutUser
    };