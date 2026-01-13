"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBankAccountService = void 0;
const UserBankAccount_model_1 = require("../models/UserBankAccount.model");
const bankVerification_service_1 = require("./bankVerification.service");
class UserBankAccountService {
    static async list(userId) {
        return UserBankAccount_model_1.UserBankAccount.find({
            userId,
            isActive: true
        }).lean();
    }
    static async add(userId, data) {
        if (data.isPrimary) {
            await UserBankAccount_model_1.UserBankAccount.updateMany({ userId }, { isPrimary: false });
        }
        return UserBankAccount_model_1.UserBankAccount.create({
            ...data,
            userId
        });
    }
    static async remove(userId, id) {
        const acc = await UserBankAccount_model_1.UserBankAccount.findOneAndUpdate({ _id: id, userId }, { isActive: false }, { new: true });
        if (!acc)
            throw new Error("Bank account not found");
        return acc;
    }
    static async verifyBank(bankId) {
        const bank = await UserBankAccount_model_1.UserBankAccount.findById(bankId);
        if (!bank)
            throw new Error("Bank not found");
        const result = await bankVerification_service_1.BankVerificationService.pennyDrop(bank);
        bank.verification = {
            status: result.success ? "VERIFIED" : "FAILED",
            verifiedAt: new Date(),
            referenceId: result.referenceId
        };
        return bank.save();
    }
}
exports.UserBankAccountService = UserBankAccountService;
