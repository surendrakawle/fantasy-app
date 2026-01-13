"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authMiddleware = (req, res, next) => {
    // ✅ BYPASS AUTH FOR ICT / LOCAL
    if (env_1.env.NODE_ENV === "ict" && process.env.AUTH_BYPASS === "true") {
        req.user = {
            userId: "TEST_USER_ID",
            role: "ADMIN"
        };
        return next();
    }
    // 🔐 PROD AUTH
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ "success": false, message: "Token missing" });
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ "success": false, message: "Unauthorized" });
    try {
        req.user = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        if (req.user.isBlocked) {
            return res.status(403).json({ "success": false, message: "Account blocked" });
        }
        next();
    }
    catch {
        res.status(401).json({ "success": false, message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
