"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const mongoose_1 = __importDefault(require("mongoose"));
const queueRedis_1 = require("../config/queueRedis");
const Wallet_model_1 = require("../models/Wallet.model");
const Result_model_1 = require("../models/Result.model");
const Transaction_model_1 = require("../models/Transaction.model");
new bullmq_1.Worker("wallet-queue", async (job) => {
    const { contestId } = job.data;
    const winners = await Result_model_1.Result.find({
        contestId,
        credited: false,
        winningAmount: { $gt: 0 }
    });
    for (const win of winners) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            await Wallet_model_1.Wallet.updateOne({ userId: win.userId }, { $inc: { balance: win.winningAmount } }, { session });
            await Transaction_model_1.Transaction.create([{
                    userId: win.userId,
                    type: "WIN",
                    amount: win.winningAmount,
                    reference: `Contest ${contestId}`
                }], { session });
            win.credited = true;
            await win.save({ session });
            await session.commitTransaction();
        }
        catch (e) {
            await session.abortTransaction();
            throw e;
        }
        finally {
            session.endSession();
        }
    }
}, {
    connection: queueRedis_1.queueRedis,
    concurrency: 3
});
