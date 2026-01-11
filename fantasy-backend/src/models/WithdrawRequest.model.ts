import { Schema, model, Types } from "mongoose";

export interface IWithdrawRequest {
  userId: Types.ObjectId;
  amount: number;
  tdsAmount: number;
  netAmount: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAID";
  createdAt: Date;
}

const schema = new Schema<IWithdrawRequest>({
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  amount: Number,
  tdsAmount: Number,
  netAmount: Number,
  status: { type: String, default: "PENDING" },
  createdAt: { type: Date, default: Date.now }
});

export const WithdrawRequest = model<IWithdrawRequest>(
  "WithdrawRequest",
  schema
);
