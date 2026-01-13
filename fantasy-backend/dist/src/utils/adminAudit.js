"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAdminAction = void 0;
const AdminAuditLog_model_1 = require("../models/AdminAuditLog.model");
const logAdminAction = async ({ adminId, action, entity, entityId, payload }) => {
    try {
        await AdminAuditLog_model_1.AdminAuditLog.create({
            adminId,
            action,
            entity,
            entityId,
            payload
        });
    }
    catch (err) {
        console.error("Audit log failed:", err);
    }
};
exports.logAdminAction = logAdminAction;
