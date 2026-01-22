import { ClientSession } from "mongoose";
import { Wallet } from "../models/Wallet.model";
import { Transaction } from "../models/Transaction.model";
import { TransactionType } from "../types/transaction";

export class WalletService {
  /* -------------------- GET BALANCE -------------------- */
  static async getBalance(userId: string) {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) throw new Error("Wallet not found");
    return wallet;
  }

  /* -------------------- GET TRANSACTIONS -------------------- */
  static async getTransactions(userId: string) {
    return Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100);
  }

  /* -------------------- DEBIT WALLET -------------------- */
  static async debitWallet(
    userId: string,
    amount: number,
    reason: string,
    type: TransactionType,
    session?: ClientSession
  ) {
    if (amount <= 0) {
      throw new Error("Invalid debit amount");
    }

    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet) throw new Error("Wallet not found");

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
          type,
          reason,
        },
      ],
      { session }
    );
  }

  /* -------------------- CREDIT WALLET -------------------- */
  static async creditWallet(
    userId: string,
    amount: number,
    reason: string,
    type: TransactionType,
    session?: ClientSession
  ) {
    if (amount <= 0) {
      throw new Error("Invalid credit amount");
    }

    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet) throw new Error("Wallet not found");

    wallet.balance += amount;
    await wallet.save({ session });

    await Transaction.create(
      [
        {
          userId,
          amount,
          type,
          reason,
        },
      ],
      { session }
    );
  }
}
