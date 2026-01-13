"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositService = void 0;
const DepositRequest_model_1 = require("../models/DepositRequest.model");
const MasterPaymentMethod_model_1 = require("../models/MasterPaymentMethod.model");
const Wallet_model_1 = require("../models/Wallet.model");
const Transaction_model_1 = require("../models/Transaction.model");
class DepositService {
    /* ---------------- USER DEPOSIT REQUEST ---------------- */
    static async createUserDeposit(userId, amount) {
        if (amount <= 0) {
            throw new Error("Invalid deposit amount");
        }
        const upi = await MasterPaymentMethod_model_1.MasterPaymentMethod.findOne({
            type: "UPI",
            isActive: true
        });
        if (!upi) {
            throw new Error("No active UPI available");
        }
        return DepositRequest_model_1.DepositRequest.create({
            userId,
            amount,
            method: "UPI",
            upiId: upi.upiId,
            status: "PENDING"
        });
    }
    /* ---------------- ADMIN APPROVE UPI DEPOSIT ---------------- */
    static async approveUpiDeposit(depositId, utr, adminId) {
        if (!utr)
            throw new Error("UTR is required");
        const existing = await DepositRequest_model_1.DepositRequest.findOne({ utr });
        if (existing)
            throw new Error("Duplicate UTR");
        const deposit = await DepositRequest_model_1.DepositRequest.findById(depositId);
        if (!deposit)
            throw new Error("Deposit not found");
        if (deposit.status !== "PENDING") {
            throw new Error("Deposit already processed");
        }
        deposit.status = "SUCCESS";
        deposit.utr = utr;
        // deposit.approvedBy = adminId;
        await deposit.save();
        await Wallet_model_1.Wallet.updateOne({ userId: deposit.userId }, { $inc: { balance: deposit.amount } });
        await Transaction_model_1.Transaction.create({
            userId: deposit.userId,
            amount: deposit.amount,
            type: "CREDIT",
            reason: "UPI Deposit"
        });
        return deposit;
    }
    /* ---------------- ADMIN CASH DEPOSIT ---------------- */
    static async adminCashDeposit(userId, amount, adminId) {
        if (amount <= 0)
            throw new Error("Invalid amount");
        await Wallet_model_1.Wallet.updateOne({ userId }, { $inc: { balance: amount } });
        await Transaction_model_1.Transaction.create({
            userId,
            amount,
            type: "CREDIT",
            reason: "Admin Cash Deposit"
        });
        return DepositRequest_model_1.DepositRequest.create({
            userId,
            amount,
            method: "CASH",
            status: "SUCCESS",
            approvedBy: adminId
        });
    }
}
exports.DepositService = DepositService;
