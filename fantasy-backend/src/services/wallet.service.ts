import mongoose from "mongoose";
import { Wallet } from "../models/Wallet.model";
import { Transaction } from "../models/Transaction.model";

export async function debitWallet(
  userId: string,
  amount: number,
  reference: string
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet || wallet.balance < amount) {
      throw new Error("Insufficient wallet balance");
    }

    wallet.balance -= amount;
    await wallet.save({ session });

    await Transaction.create(
      [
        {
          userId,
          type: "ENTRY_FEE",
          amount,
          reference
        }
      ],
      { session }
    );

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
