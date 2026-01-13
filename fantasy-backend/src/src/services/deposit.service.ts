import { DepositRequest } from "../models/DepositRequest.model";
import { MasterPaymentMethod } from "../models/MasterPaymentMethod.model";
import { Wallet } from "../models/Wallet.model";
import { Transaction } from "../models/Transaction.model";

export class DepositService {
  /* ---------------- USER DEPOSIT REQUEST ---------------- */
  static async createUserDeposit(userId: string, amount: number) {
    if (amount <= 0) {
      throw new Error("Invalid deposit amount");
    }

    const upi = await MasterPaymentMethod.findOne({
      type: "UPI",
      isActive: true
    });

    if (!upi) {
      throw new Error("No active UPI available");
    }

    return DepositRequest.create({
      userId,
      amount,
      method: "UPI",
      upiId: upi.upiId,
      status: "PENDING"
    });
  }

  /* ---------------- ADMIN APPROVE UPI DEPOSIT ---------------- */
  static async approveUpiDeposit(
    depositId: string,
    utr: string,
    adminId: string
  ) {
    if (!utr) throw new Error("UTR is required");

    const existing = await DepositRequest.findOne({ utr });
    if (existing) throw new Error("Duplicate UTR");

    const deposit = await DepositRequest.findById(depositId);
    if (!deposit) throw new Error("Deposit not found");

    if (deposit.status !== "PENDING") {
      throw new Error("Deposit already processed");
    }

    deposit.status = "SUCCESS";
    deposit.utr = utr;
    // deposit.approvedBy = adminId;
    await deposit.save();

    await Wallet.updateOne(
      { userId: deposit.userId },
      { $inc: { balance: deposit.amount } }
    );

    await Transaction.create({
      userId: deposit.userId,
      amount: deposit.amount,
      type: "CREDIT",
      reason: "UPI Deposit"
    });

    return deposit;
  }

  /* ---------------- ADMIN CASH DEPOSIT ---------------- */
  static async adminCashDeposit(
    userId: string,
    amount: number,
    adminId: string
  ) {
    if (amount <= 0) throw new Error("Invalid amount");

    await Wallet.updateOne(
      { userId },
      { $inc: { balance: amount } }
    );

    await Transaction.create({
      userId,
      amount,
      type: "CREDIT",
      reason: "Admin Cash Deposit"
    });

    return DepositRequest.create({
      userId,
      amount,
      method: "CASH",
      status: "SUCCESS",
      approvedBy: adminId
    });
  }
}
