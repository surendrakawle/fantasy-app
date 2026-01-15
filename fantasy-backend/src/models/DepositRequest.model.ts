import { Schema, model, Types } from "mongoose";

const DepositRequestSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true },
    amount: { type: Number, required: true },

    method: {
      type: String,
      enum: ["UPI", "CASH"],
      required: true
    },

    upiId: String,            // master UPI
    utr: String,              // user provided

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING"
    },

    approvedBy: {
      type: Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

export const DepositRequest = model(
  "DepositRequest",
  DepositRequestSchema
);
