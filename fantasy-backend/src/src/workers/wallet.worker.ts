import { Worker } from "bullmq";
import mongoose from "mongoose";
import { queueRedis } from "../config/queueRedis";
import { Wallet } from "../models/Wallet.model";
import { Result } from "../models/Result.model";
import { Transaction } from "../models/Transaction.model";

new Worker(
  "wallet-queue",
  async (job) => {
    const { contestId } = job.data;

    const winners = await Result.find({
      contestId,
      credited: false,
      winningAmount: { $gt: 0 }
    });

    for (const win of winners) {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        await Wallet.updateOne(
          { userId: win.userId },
          { $inc: { balance: win.winningAmount } },
          { session }
        );

        await Transaction.create(
          [{
            userId: win.userId,
            type: "WIN",
            amount: win.winningAmount,
            reference: `Contest ${contestId}`
          }],
          { session }
        );

        win.credited = true;
        await win.save({ session });

        await session.commitTransaction();
      } catch (e) {
        await session.abortTransaction();
        throw e;
      } finally {
        session.endSession();
      }
    }
  },
  {
    connection: queueRedis,
    concurrency: 3
  }
);
