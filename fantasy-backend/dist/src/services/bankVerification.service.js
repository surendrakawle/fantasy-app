"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankVerificationService = void 0;
class BankVerificationService {
    static async pennyDrop(bank) {
        // 🔴 Replace with real API (Cashfree/Razorpay)
        return {
            success: true,
            referenceId: "PD_" + Date.now()
        };
    }
}
exports.BankVerificationService = BankVerificationService;
