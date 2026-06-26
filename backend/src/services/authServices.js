const User = require("../models/User");
const crypto = require("crypto");

const sendEmail = require("../utils/sendEmail");
const { generateToken } = require("../utils/tokenUtils");

const registerUser = async ({ name, email, password }) => {
    const user = await User.create({
        name,
        email,
        password,
    });

    return {
        message: "User registered",
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
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

    return {
        message: "Login successful",
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

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

module.exports = {
    registerUser,
    loginUser,
    forgotPasswordService,
    resetPasswordService,
};