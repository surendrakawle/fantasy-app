"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debitWallet = debitWallet;
const mongoose_1 = __importDefault(require("mongoose"));
const Wallet_model_1 = require("../models/Wallet.model");
const Transaction_model_1 = require("../models/Transaction.model");
async function debitWallet(userId, amount, reference) {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const wallet = await Wallet_model_1.Wallet.findOne({ userId }).session(session);
        if (!wallet || wallet.balance < amount) {
            throw new Error("Insufficient wallet balance");
        }
        wallet.balance -= amount;
        await wallet.save({ session });
        await Transaction_model_1.Transaction.create([
            {
                userId,
                type: "ENTRY_FEE",
                amount,
                reference
            }
        ], { session });
        await session.commitTransaction();
    }
    catch (err) {
        await session.abortTransaction();
        throw err;
    }
    finally {
        session.endSession();
    }
}
