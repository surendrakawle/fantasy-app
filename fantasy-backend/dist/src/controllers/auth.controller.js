"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_mapper_1 = require("../mappers/auth.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const { user, token: jwtToken } = await auth_service_1.AuthService.googleLogin(token);
        return (0, apiResponse_1.success)(res, (0, auth_mapper_1.mapAuthResponse)(user, jwtToken), "Login successful", 200);
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message || "Google authentication failed", err.message === "Google token is required" ? 400 : 401);
    }
};
exports.googleLogin = googleLogin;
