"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalAdminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const WithdrawRequest_model_1 = require("../models/WithdrawRequest.model");
const wallet_service_1 = require("./wallet.service");
class WithdrawalAdminService {
    static async approve(withdrawId, adminId) {
        const wr = await WithdrawRequest_model_1.WithdrawRequest.findById(withdrawId);
        if (!wr || wr.status !== "PENDING") {
            throw new Error("Invalid withdrawal request");
        }
        wr.status = "APPROVED";
        wr.processedBy = adminId;
        wr.processedAt = new Date();
        await wr.save();
        return wr;
    }
    static async reject(withdrawId, adminId, reason) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const wr = await WithdrawRequest_model_1.WithdrawRequest.findById(withdrawId).session(session);
            if (!wr || wr.status !== "PENDING") {
                throw new Error("Invalid withdrawal request");
            }
            // refund wallet
            await wallet_service_1.WalletService.creditWallet(wr.userId.toString(), wr.amount, "Withdrawal rejected refund", session);
            wr.status = "REJECTED";
            wr.rejectReason = reason;
            wr.processedBy = adminId;
            wr.processedAt = new Date();
            await wr.save({ session });
            await session.commitTransaction();
            session.endSession();
            return wr;
        }
        catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }
}
exports.WithdrawalAdminService = WithdrawalAdminService;
