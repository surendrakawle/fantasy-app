import { Schema, model, Types } from "mongoose";

export interface IContest {
  match: Types.ObjectId;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  joinedCount: number;
  lockTime: Date; // 🔒 when predictions close
  contestType: "TEAM" | "PREDICTION";
  status: "OPEN" | "LOCKED" | "LIVE" | "COMPLETED";
  createdAt: Date;
}

const contestSchema = new Schema<IContest>({
  match: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    index: true,
    required: true
  },
  entryFee: { type: Number, required: true },
  prizePool: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  joinedCount: { type: Number, default: 0 },
  lockTime: {
    type: Date,
    required: true
  },
  contestType: {
    type: String,
    enum: ["TEAM", "PREDICTION"],
    default: "PREDICTION"
  },
  status: {
    type: String,
    enum: ["OPEN", "LOCKED", "LIVE", "COMPLETED"],
    default: "OPEN",
    index: true
  },
  createdAt: { type: Date, default: Date.now }
});

export const Contest = model<IContest>("Contest", contestSchema);
