import mongoose from "mongoose";
import { Wallet } from "../models/Wallet.model";
import { WithdrawRequest } from "../models/WithdrawRequest.model";
import { fraudQueue } from "../queues/fraud.queue";
import { WalletService } from "./wallet.service";

const TDS_PERCENT = 0.30; // 30%

export class WithdrawalService {
  static async requestWithdraw(userId: string, amount: number) {
    if (!amount || amount <= 0) {
      throw new Error("Invalid withdrawal amount");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const wallet = await Wallet.findOne({ userId }).session(session);

      if (!wallet || wallet.balance < amount) {
        throw new Error("Insufficient wallet balance");
      }

      const tdsAmount = Number((amount * TDS_PERCENT).toFixed(2));
      const netAmount = Number((amount - tdsAmount).toFixed(2));

      /* Lock funds (debit wallet) */
      await WalletService.debitWallet(
        userId,
        amount,
        "Withdraw request",
        session
      );

      const withdrawRequest = await WithdrawRequest.create(
        [
          {
            userId,
            amount,
            tdsAmount,
            netAmount,
            status: "PENDING"
          }
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      /* Async fraud check */
      await fraudQueue.add(
        "fraud-check",
        {
          userId,
          withdrawId: withdrawRequest[0]._id,
          amount,
          fastWithdraw: true
        },
        {
          attempts: 3,
          removeOnComplete: true
        }
      );

      return withdrawRequest[0];
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
}
