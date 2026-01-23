import { Schema, model, Types } from "mongoose";
import type { UserPredictionStatus } from "../types/prediction-status";

export interface IUserPrediction {
  _id: Types.ObjectId;

  userId: Types.ObjectId;
  contestId: Types.ObjectId;
  predictionId: Types.ObjectId;

  selectedAnswer: string;

  /* ---------- MONEY ---------- */
  amount: number;
  multiplier: number;
  potentialWin: number;

  /* ---------- RESULT ---------- */
  status: UserPredictionStatus;   // ✅ NEW
  isCorrect?: boolean;
  pointsEarned: number;
  winAmount: number;
  entryNo: number;

  settled: boolean;

  createdAt: Date;
}



const schema = new Schema<IUserPrediction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  },

  contestId: {
    type: Schema.Types.ObjectId,
    ref: "Contest",
    index: true,
    required: true
  },

  predictionId: {
    type: Schema.Types.ObjectId,
    ref: "Prediction",
    index: true,
    required: true
  },

  entryNo: {
    type: Number,
    required: true
  },

  selectedAnswer: {
    type: String,
    required: true
  },

  /* MONEY */
  amount: { type: Number, required: true },
  multiplier: { type: Number, required: true },
  potentialWin: { type: Number, required: true },

  /* RESULT */
  status: {
    type: String,
    enum: ["PLACED", "WON", "LOST", "REFUNDED"],
    default: "PLACED",
    index: true
  },

  isCorrect: Boolean,
  pointsEarned: { type: Number, default: 0 },
  winAmount: { type: Number, default: 0 },

  settled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

/* ✅ UNIQUE PER ENTRY */
schema.index(
  { userId: 1, contestId: 1, predictionId: 1, entryNo: 1 },
  { unique: true }
);

export const UserPrediction = model(
  "UserPrediction",
  schema
);

