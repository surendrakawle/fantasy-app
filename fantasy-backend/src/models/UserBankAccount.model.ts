import { Schema, model, Types } from "mongoose";

const UserBankAccountSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      index: true,
      required: true
    },

    bankName: String,
    accountName: String,
    accountNumber: String,
    ifsc: String,

    isVerified: {
      type: Boolean,
      default: false
    },

    isPrimary: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    verification: {
        status: {
          type: String,
          enum: ["PENDING", "VERIFIED", "FAILED"],
          default: "PENDING"
        },
        verifiedAt: Date,
        referenceId: String
      },
      
  },
  { timestamps: true }
);

/* Only one primary account per user */
UserBankAccountSchema.index(
  { userId: 1, isPrimary: 1 },
  { unique: true, partialFilterExpression: { isPrimary: true } }
);

export const UserBankAccount = model(
  "UserBankAccount",
  UserBankAccountSchema
);
