"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const Admin_model_1 = require("../models/Admin.model");
const adminOnly = async (req, res, next) => {
    const admin = await Admin_model_1.Admin.findOne({ userId: req.user.userId });
    if (!admin) {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
exports.adminOnly = adminOnly;
