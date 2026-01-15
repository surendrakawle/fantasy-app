import { Schema, model } from "mongoose";

const MasterPaymentMethodSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["BANK", "UPI"],
      required: true,
      index: true
    },

    label: String, // Display name

    /* -------- BANK -------- */
    bankName: String,
    accountName: String,
    accountNumber: String,
    ifsc: String,
    branch: String,

    /* -------- UPI -------- */
    upiId: String,
    upiHolderName: String,

    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

export const MasterPaymentMethod = model(
  "MasterPaymentMethod",
  MasterPaymentMethodSchema
);
