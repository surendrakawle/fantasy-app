"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBankService = void 0;
const UserBankAccount_model_1 = require("../models/UserBankAccount.model");
class AdminBankService {
    static async approveBank(bankId, adminUserId) {
        const bank = await UserBankAccount_model_1.UserBankAccount.findByIdAndUpdate(bankId, {
            isVerified: true,
            "verification.status": "VERIFIED",
            "verification.verifiedAt": new Date()
        }, { new: true });
        if (!bank) {
            throw new Error("Bank account not found");
        }
        return bank;
    }
    static async rejectBank(bankId, adminUserId, reason) {
        const bank = await UserBankAccount_model_1.UserBankAccount.findByIdAndUpdate(bankId, {
            isVerified: false,
            "verification.status": "FAILED",
            "verification.reason": reason || "Rejected by admin"
        }, { new: true });
        if (!bank) {
            throw new Error("Bank account not found");
        }
        return bank;
    }
}
exports.AdminBankService = AdminBankService;
