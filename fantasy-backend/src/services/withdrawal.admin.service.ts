import mongoose from "mongoose";
import { WithdrawRequest } from "../models/WithdrawRequest.model";
import { WalletService } from "./wallet.service";

export class WithdrawalAdminService {
  static async approve(withdrawId: string, adminId: string) {
    const wr = await WithdrawRequest.findById(withdrawId);
    if (!wr || wr.status !== "PENDING") {
      throw new Error("Invalid withdrawal request");
    }

    wr.status = "APPROVED";
    wr.processedBy = adminId;
    wr.processedAt = new Date();
    await wr.save();

    return wr;
  }

  static async reject(withdrawId: string, adminId: string, reason: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const wr = await WithdrawRequest.findById(withdrawId).session(session);
      if (!wr || wr.status !== "PENDING") {
        throw new Error("Invalid withdrawal request");
      }

      // refund wallet
      await WalletService.creditWallet(
        wr.userId.toString(),
        wr.amount,
        "Withdrawal rejected refund",
        session
      );

      wr.status = "REJECTED";
      wr.rejectReason = reason;
      wr.processedBy = adminId;
      wr.processedAt = new Date();
      await wr.save({ session });

      await session.commitTransaction();
      session.endSession();

      return wr;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
}
