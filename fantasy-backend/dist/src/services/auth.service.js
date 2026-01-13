"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../models/User.model");
const Wallet_model_1 = require("../models/Wallet.model");
const Role_model_1 = require("../models/Role.model");
const googleAuth_service_1 = require("./googleAuth.service");
const env_1 = require("../config/env");
class AuthService {
    static async googleLogin(googleToken) {
        if (!googleToken) {
            throw new Error("Google token is required");
        }
        /* 1️⃣ Verify Google token */
        const payload = await (0, googleAuth_service_1.verifyGoogleToken)(googleToken);
        if (!payload?.email || !payload?.googleId) {
            throw new Error("Invalid Google token");
        }
        /* 2️⃣ Find or create user */
        let user = await User_model_1.User.findOne({ email: payload.email }).populate("role");
        if (!user) {
            const userRole = await Role_model_1.Role.findOne({ name: "USER" });
            if (!userRole) {
                throw new Error("Default USER role not found");
            }
            user = await User_model_1.User.create({
                name: payload.name,
                email: payload.email,
                googleId: payload.googleId,
                authProvider: "google",
                role: userRole._id
            });
            await Wallet_model_1.Wallet.create({ userId: user._id });
            user = await user.populate({ path: "role", select: "name permissions" });
        }
        /* 3️⃣ Blocked user check */
        if (user.isBlocked) {
            throw new Error("User account is blocked");
        }
        /* 4️⃣ Issue JWT */
        const token = jsonwebtoken_1.default.sign({
            userId: user._id.toString(),
            role: user.role.name
        }, env_1.env.JWT_SECRET, { expiresIn: "7d" });
        return { user, token };
    }
}
exports.AuthService = AuthService;
