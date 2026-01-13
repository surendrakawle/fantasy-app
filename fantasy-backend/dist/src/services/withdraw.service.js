"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Wallet_model_1 = require("../models/Wallet.model");
const WithdrawRequest_model_1 = require("../models/WithdrawRequest.model");
const fraud_queue_1 = require("../queues/fraud.queue");
const wallet_service_1 = require("./wallet.service");
const TDS_PERCENT = 0.30; // 30%
class WithdrawalService {
    static async requestWithdraw(userId, amount) {
        if (!amount || amount <= 0) {
            throw new Error("Invalid withdrawal amount");
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const wallet = await Wallet_model_1.Wallet.findOne({ userId }).session(session);
            if (!wallet || wallet.balance < amount) {
                throw new Error("Insufficient wallet balance");
            }
            const tdsAmount = Number((amount * TDS_PERCENT).toFixed(2));
            const netAmount = Number((amount - tdsAmount).toFixed(2));
            /* Lock funds (debit wallet) */
            await wallet_service_1.WalletService.debitWallet(userId, amount, "Withdraw request", session);
            const withdrawRequest = await WithdrawRequest_model_1.WithdrawRequest.create([
                {
                    userId,
                    amount,
                    tdsAmount,
                    netAmount,
                    status: "PENDING"
                }
            ], { session });
            await session.commitTransaction();
            session.endSession();
            /* Async fraud check */
            await fraud_queue_1.fraudQueue.add("fraud-check", {
                userId,
                withdrawId: withdrawRequest[0]._id,
                amount,
                fastWithdraw: true
            }, {
                attempts: 3,
                removeOnComplete: true
            });
            return withdrawRequest[0];
        }
        catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }
}
exports.WithdrawalService = WithdrawalService;
