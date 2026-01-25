import { Schema, model, Types } from "mongoose";

export type PaymentMethodType = "BANK" | "UPI" | "WALLET";

const UserPaymentMethodSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },

    type: {
      type: String,
      enum: ["BANK", "UPI", "WALLET"],
      required: true,
    },

    /* ---------- BANK ---------- */
    bankName: String,
    accountName: String,
    accountNumber: String,
    ifsc: String,

    /* ---------- UPI ---------- */
    upiId: String,

    /* ---------- WALLET ---------- */
    provider: {
      type: String,
      enum: ["PAYTM", "PHONEPE", "OTHER"],
    },
    phoneNumber: String,

    /* ---------- FLAGS ---------- */
    isPrimary: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    verification: {
      status: {
        type: String,
        enum: ["PENDING", "VERIFIED", "FAILED"],
        default: "PENDING",
      },
      verifiedAt: Date,
      referenceId: String,
    },
  },
  { timestamps: true }
);

/* Only ONE primary payment method per user */
UserPaymentMethodSchema.index(
  { userId: 1, isPrimary: 1 },
  { unique: true, partialFilterExpression: { isPrimary: true } }
);

export const UserPaymentMethod = model(
  "UserPaymentMethod",
  UserPaymentMethodSchema
);
