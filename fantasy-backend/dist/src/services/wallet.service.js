"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const Wallet_model_1 = require("../models/Wallet.model");
const Transaction_model_1 = require("../models/Transaction.model");
class WalletService {
    /* -------------------- GET BALANCE -------------------- */
    static async getBalance(userId) {
        const wallet = await Wallet_model_1.Wallet.findOne({ userId });
        if (!wallet) {
            throw new Error("Wallet not found");
        }
        return wallet;
    }
    /* -------------------- GET TRANSACTIONS -------------------- */
    static async getTransactions(userId) {
        return Transaction_model_1.Transaction.find({ userId })
            .sort({ createdAt: -1 })
            .limit(100);
    }
    /* -------------------- DEBIT WALLET (ATOMIC) -------------------- */
    static async debitWallet(userId, amount, reason, session, type) {
        if (amount <= 0) {
            throw new Error("Invalid debit amount");
        }
        const wallet = await Wallet_model_1.Wallet.findOne({ userId }).session(session);
        if (!wallet) {
            throw new Error("Wallet not found");
        }
        if (wallet.balance < amount) {
            throw new Error("Insufficient wallet balance");
        }
        wallet.balance -= amount;
        await wallet.save({ session });
        await Transaction_model_1.Transaction.create([
            {
                userId,
                amount: -amount,
                type: "ENTRY_FEE",
                reason
            }
        ], { session });
    }
    /* -------------------- CREDIT WALLET (OPTIONAL BUT RECOMMENDED) -------------------- */
    static async creditWallet(userId, amount, reason, session) {
        if (amount <= 0) {
            throw new Error("Invalid credit amount");
        }
        const wallet = await Wallet_model_1.Wallet.findOne({ userId }).session(session);
        if (!wallet) {
            throw new Error("Wallet not found");
        }
        wallet.balance += amount;
        await wallet.save({ session });
        await Transaction_model_1.Transaction.create([
            {
                userId,
                amount,
                type: "CREDIT",
                reason
            }
        ], { session });
    }
}
exports.WalletService = WalletService;
