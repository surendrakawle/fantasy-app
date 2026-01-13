"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../models/User.model");
const Wallet_model_1 = require("../models/Wallet.model");
const googleAuth_service_1 = require("../services/googleAuth.service");
const env_1 = require("../config/env");
const Role_model_1 = require("../models/Role.model");
const googleLogin = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: "Google token required" });
    }
    const payload = await (0, googleAuth_service_1.verifyGoogleToken)(token);
    if (!payload?.email) {
        return res.status(401).json({ message: "Invalid Google token" });
    }
    let user = await User_model_1.User.findOne({ email: payload.email });
    if (!user) {
        const userRole = await Role_model_1.Role.findOne({ name: "USER" });
        user = await User_model_1.User.create({
            name: payload.name,
            email: payload.email,
            googleId: payload.sub,
            role: userRole._id
        });
        await Wallet_model_1.Wallet.create({ userId: user._id });
    }
    const jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, env_1.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token: jwtToken });
};
exports.googleLogin = googleLogin;
