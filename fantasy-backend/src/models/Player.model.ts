import { Schema, model } from "mongoose";

export type PlayerRole =
  | "BATSMAN"
  | "BOWLER"
  | "ALL_ROUNDER"
  | "WICKET_KEEPER";

const PlayerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    team: {
      type: String,
      required: true,
      uppercase: true, // IND / AUS
      index: true,
    },

    role: {
      type: String,
      enum: ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"],
      required: true,
      index: true,
    },

    credit: {
      type: Number,
      required: true,
      min: 4,
      max: 12,
    },

    /* ================= PLAYER IMAGE ================= */

    profileImageBase64: {
      type: String,
      required: false,
      /**
       * Expected format:
       * data:image/png;base64,iVBORw0KGgoAAAANS...
       */
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          return /^data:image\/(png|jpg|jpeg|webp);base64,/.test(v);
        },
        message: "Invalid base64 image format",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= INDEXES ================= */

PlayerSchema.index({ team: 1, role: 1 });
PlayerSchema.index({ isActive: 1 });

export const Player = model("Player", PlayerSchema);
