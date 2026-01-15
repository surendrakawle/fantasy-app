import { Schema, model } from "mongoose";

const MasterConfigSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    websiteName: String,
    websiteUrl: String,

    support: {
      helpEmail: String,
      whatsappNumber: String,
      contactNumber: String
    },

    depositSupport: {
      whatsapp: String,
      email: String
    },

    withdrawalSupport: {
      whatsapp: String,
      email: String
    },

    socialLinks: {
      telegram: String,
      instagram: String,
      twitter: String,
      youtube: String
    },

    /* ---------------- FEATURE FLAGS ---------------- */
    features: {
      enableDeposit: { type: Boolean, default: true },
      enableWithdrawal: { type: Boolean, default: true },
      enablePrediction: { type: Boolean, default: true },
      enableMatchContest: { type: Boolean, default: true },
      enableReferral: { type: Boolean, default: false }
    },

    /* ---------------- MAINTENANCE MODE ---------------- */
    maintenance: {
      enabled: { type: Boolean, default: false },
      message: {
        en: { type: String },
        hi: { type: String }
      }
    }
  },
  {
    timestamps: true
  }
);

export const MasterConfig = model(
  "MasterConfig",
  MasterConfigSchema
);
