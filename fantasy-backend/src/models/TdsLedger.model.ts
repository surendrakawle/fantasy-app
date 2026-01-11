import { Schema, model, Types } from "mongoose";

export interface ITdsLedger {
  userId: Types.ObjectId;
  transactionId: Types.ObjectId;
  tdsAmount: number;
  financialYear: string;
  createdAt: Date;
}

const schema = new Schema<ITdsLedger>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  transactionId: { type: Schema.Types.ObjectId, ref: "Transaction" },
  tdsAmount: Number,
  financialYear: String,
  createdAt: { type: Date, default: Date.now }
});

export const TdsLedger = model<ITdsLedger>("TdsLedger", schema);
