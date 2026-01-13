"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    action: String,
    ip: String,
    userAgent: String,
    createdAt: { type: Date, default: Date.now }
});
exports.AuditLog = (0, mongoose_1.model)("AuditLog", schema);
