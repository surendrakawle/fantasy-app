"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_model_1 = require("../models/User.model");
class UserService {
    static async getMe(userId) {
        if (!userId) {
            throw new Error("User ID missing");
        }
        const user = await User_model_1.User.findById(userId)
            .populate("role", "name permissions")
            .lean(); // ✅ improves performance
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    /* -------------------- ADMIN -------------------- */
    static async listUsers(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            User_model_1.User.find()
                .populate("role", "name")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean(),
            User_model_1.User.countDocuments()
        ]);
        return {
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    static async updateUserByAdmin(userId, data) {
        const user = await User_model_1.User.findByIdAndUpdate(userId, data, { new: true }).populate("role", "name");
        if (!user)
            throw new Error("User not found");
        return user;
    }
    /* -------------------- USER -------------------- */
    static async updateMyProfile(userId, data) {
        const allowed = {
            name: data.name
        };
        const user = await User_model_1.User.findByIdAndUpdate(userId, allowed, { new: true }).populate("role", "name");
        if (!user)
            throw new Error("User not found");
        return user;
    }
}
exports.UserService = UserService;
