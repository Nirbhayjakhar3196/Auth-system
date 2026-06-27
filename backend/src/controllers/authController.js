const authService = require("../services/authServices");

const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);

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

        const result = await authService.logoutUser(req.body.refreshToken);

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