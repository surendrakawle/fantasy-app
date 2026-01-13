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
      trim: true
    },
    team: {
      type: String,
      required: true,
      uppercase: true // IND / AUS
    },
    role: {
      type: String,
      enum: ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"],
      required: true
    },
    credit: {
      type: Number,
      required: true,
      min: 4,
      max: 12
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

/* Index for faster search */
PlayerSchema.index({ team: 1, role: 1 });

export const Player = model("Player", PlayerSchema);
