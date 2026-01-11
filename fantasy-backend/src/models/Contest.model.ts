import { Schema, model, Types } from "mongoose";

export interface IContest {
  matchId: Types.ObjectId;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  joinedCount: number;
  status: "OPEN" | "LOCKED" | "COMPLETED";
  createdAt: Date;
}

const contestSchema = new Schema<IContest>({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    index: true
  },
  entryFee: { type: Number, required: true },
  prizePool: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  joinedCount: { type: Number, default: 0 },
  status: { type: String, default: "OPEN", index: true },
  createdAt: { type: Date, default: Date.now }
});

export const Contest = model<IContest>("Contest", contestSchema);
