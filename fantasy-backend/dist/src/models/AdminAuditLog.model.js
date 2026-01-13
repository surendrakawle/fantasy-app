"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuditLog = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: String,
    payload: mongoose_1.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});
exports.AdminAuditLog = (0, mongoose_1.model)("AdminAuditLog", schema);
