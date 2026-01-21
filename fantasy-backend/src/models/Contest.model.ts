import mongoose, { Schema, Document } from "mongoose";

export interface IContest extends Document {
  matchId: mongoose.Types.ObjectId;
  contestType: "TEAM" | "PREDICTION";

  // TEAM contest
  entryFee?: number;

  // PREDICTION contest
  baseAmount?: number;
  multiplier?: number; // 2x, 3x, 5x

  prizePool?: number;
  maxParticipants?: number;
  joinedCount?: number;
  lockTime: Date;
  status: "OPEN" | "LOCKED" | "COMPLETED";
  createdAt: Date;
}

const contestSchema = new Schema<IContest>({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    required: true,
    index: true
  },

  contestType: {
    type: String,
    enum: ["TEAM", "PREDICTION"],
    required: true
  },

  /* TEAM contest */
  entryFee: { type: Number },

  /* PREDICTION contest */
  baseAmount: { type: Number },     // base entry
  multiplier: { type: Number },     // 2, 3, 5 etc

  prizePool: { type: Number, required: false },
  maxParticipants: { type: Number, required: false },
  joinedCount: { type: Number, default: 0 },

  lockTime: { type: Date, required: true },
  status: { type: String, default: "OPEN", index: true },

  createdAt: { type: Date, default: Date.now }
});

export const Contest = mongoose.model<IContest>("Contest", contestSchema);
