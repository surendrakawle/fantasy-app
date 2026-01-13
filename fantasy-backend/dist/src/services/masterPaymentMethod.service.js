"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterPaymentMethodService = void 0;
const MasterPaymentMethod_model_1 = require("../models/MasterPaymentMethod.model");
class MasterPaymentMethodService {
    /* ---------- PUBLIC (FOR USERS) ---------- */
    static async listActive(type) {
        const filter = { isActive: true };
        if (type)
            filter.type = type;
        return MasterPaymentMethod_model_1.MasterPaymentMethod.find(filter)
            .sort({ createdAt: -1 })
            .lean();
    }
    /* ---------- ADMIN ---------- */
    static async create(data) {
        return MasterPaymentMethod_model_1.MasterPaymentMethod.create(data);
    }
    static async update(id, data) {
        const updated = await MasterPaymentMethod_model_1.MasterPaymentMethod.findByIdAndUpdate(id, data, { new: true });
        if (!updated)
            throw new Error("Payment method not found");
        return updated;
    }
    static async deactivate(id) {
        const updated = await MasterPaymentMethod_model_1.MasterPaymentMethod.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!updated)
            throw new Error("Payment method not found");
        return updated;
    }
}
exports.MasterPaymentMethodService = MasterPaymentMethodService;
