import { Schema, model, Types } from "mongoose";

export type TransactionType =
  | "DEPOSIT"
  | "ENTRY_FEE"
  | "PREDICT"
  | "WIN"
  | "WITHDRAW"
  | "REFUND";

export interface ITransaction {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  type: TransactionType;

  contest?: Types.ObjectId;
  prediction?: Types.ObjectId;
  deposit?: Types.ObjectId;
  withdraw?: Types.ObjectId;

  amount: number;          // + credit, - debit
  reason?: string;

  createdAt: Date;
}

const schema = new Schema<ITransaction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  },

  type: {
    type: String,
    enum: [
      "DEPOSIT",
      "ENTRY_FEE",
      "PREDICT",
      "WIN",
      "WITHDRAW",
      "REFUND"
    ],
    index: true,
    required: true
  },

  contest: {
    type: Schema.Types.ObjectId,
    ref: "Contest",
    index: true
  },

  prediction: {
    type: Schema.Types.ObjectId,
    ref: "Prediction",
    index: true
  },

  deposit: {
    type: Schema.Types.ObjectId,
    ref: "DepositRequest",
    index: true
  },

  withdraw: {
    type: Schema.Types.ObjectId,
    ref: "WithdrawRequest",
    index: true
  },

  amount: {
    type: Number,
    required: true
  },

  reason: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

/* ---------- INDEXES FOR FAST FILTERING ---------- */
schema.index({ userId: 1, createdAt: -1 });
schema.index({ type: 1, createdAt: -1 });
schema.index({ contest: 1 });
schema.index({ prediction: 1 });

export const Transaction = model<ITransaction>("Transaction", schema);
