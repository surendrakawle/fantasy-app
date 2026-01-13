"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        // index: true,
        lowercase: true
    },
    googleId: {
        type: String,
        required: true,
        // index: true
    },
    authProvider: {
        type: String,
        enum: ["google"],
        default: "google"
    },
    // 🔐 RBAC
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
        index: true
    },
    // 🚫 Account control
    isBlocked: {
        type: Boolean,
        default: false
    },
    // 🕒 Audit fields
    lastLoginAt: {
        type: Date
    }
}, {
    timestamps: true // adds createdAt & updatedAt
});
// 🔍 Helpful indexes
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ role: 1, isBlocked: 1 });
exports.User = (0, mongoose_1.model)("User", userSchema);
