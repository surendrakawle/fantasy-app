import { ClientSession } from "mongoose";
import { Wallet } from "../models/Wallet.model";
import { Transaction } from "../models/Transaction.model";

export class WalletService {
  /* -------------------- GET BALANCE -------------------- */
  static async getBalance(userId: string) {
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return wallet;
  }

  /* -------------------- GET TRANSACTIONS -------------------- */
  static async getTransactions(userId: string) {
    return Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100);
  }

  /* -------------------- DEBIT WALLET (ATOMIC) -------------------- */
  static async debitWallet(
    userId: string,
    amount: number,
    reason: string,
    session?: ClientSession,
    type?: string
  ) {
    if (amount <= 0) {
      throw new Error("Invalid debit amount");
    }

    const wallet = await Wallet.findOne({ userId }).session(session);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (wallet.balance < amount) {
      throw new Error("Insufficient wallet balance");
    }

    wallet.balance -= amount;
    await wallet.save({ session });

    await Transaction.create(
      [
        {
          userId,
          amount: -amount,
          type: "ENTRY_FEE",
          reason
        }
      ],
      { session }
    );
  }

  /* -------------------- CREDIT WALLET (OPTIONAL BUT RECOMMENDED) -------------------- */
  static async creditWallet(
    userId: string,
    amount: number,
    reason: string,
    session?: ClientSession
  ) {
    if (amount <= 0) {
      throw new Error("Invalid credit amount");
    }

    const wallet = await Wallet.findOne({ userId }).session(session);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    wallet.balance += amount;
    await wallet.save({ session });

    await Transaction.create(
      [
        {
          userId,
          amount,
          type: "CREDIT",
          reason
        }
      ],
      { session }
    );
  }
}
