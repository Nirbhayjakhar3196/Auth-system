const authService = require("../services/authServices");

const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);

        res.cookie("accessToken" , result.accessToken , {

            httpOnly: true,
            secure:false,
            sameSite:"lax",
            maxAge: 15*60*1000
        })

        res.cookie("refreshToken" , result.refreshToken , {
            httpOnly: true,
            secure:false,
            sameSite:"lax",
            maxAge: 30*24*60*60*1000
        })

        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);

    console.log("LOGIN RESULT");
    console.log(result);

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });

    console.log("Access cookie set");

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    console.log("Refresh cookie set");

    return res.status(200).json(result);
    
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const refreshToken = async (req, res) => {

    try {
        const result = await authService.refreshTokenService(req.body.refreshToken);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }

}

const forgotPassword = async (req, res) => {
    try {
        const result = await authService.forgotPasswordService(
            req.body.email
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const result = await authService.resetPasswordService(
            req.params.token,
            req.body.password
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const logout = async (req, res) => {

    try{

        const result = await authService.logoutUser(req.cookies.refreshToken);

        res.cookie("accessToken" , "" , {
            httpOnly: true,
            secure:false,
            sameSite:"lax",
        })

        res.cookie("refreshToken" , "" , {
            httpOnly: true,
            secure:false,
            sameSite:"lax",
        })
        

        return res.status(200).json(result);
    }
    catch(error){
        return res.status(400).json({
            message: error.message,
        });

}

}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    refreshToken,
    logout
}