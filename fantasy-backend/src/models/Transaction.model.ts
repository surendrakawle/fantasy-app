import { Schema, model, Types } from "mongoose";

export type TransactionType =
  | "DEPOSIT"
  | "ENTRY_FEE"
  | "WIN"
  | "WITHDRAW"
  | "REFUND";

export interface ITransaction {
  userId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  reference?: string;
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  reference: String,
  createdAt: { type: Date, default: Date.now }
});

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
