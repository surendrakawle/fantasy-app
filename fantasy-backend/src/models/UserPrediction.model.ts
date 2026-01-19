import { Schema, model, Types } from "mongoose";

export interface IUserPrediction {
  _id: any;
  userId: Types.ObjectId;
  contestId: Types.ObjectId;
  predictionId: Types.ObjectId;

  selectedAnswer: string;

  // MONEY PART
  amount: number;          // user-entered amount
  multiplier: number;      // contest multiplier (2x, 3x, 5x)
  potentialWin: number;    // amount * multiplier

  // RESULT PART
  isCorrect?: boolean;
  pointsEarned: number;
  winAmount: number;       // actual credited amount

  settled: boolean;        // wallet credited or not
  createdAt: Date;
}

const schema = new Schema<IUserPrediction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true, required: true },
  contestId: { type: Schema.Types.ObjectId, ref: "Contest", index: true, required: true },
  predictionId: { type: Schema.Types.ObjectId, ref: "Prediction", required: true },

  selectedAnswer: { type: String, required: true },

  /* ---------- MONEY ---------- */
  amount: { type: Number, required: true },
  multiplier: { type: Number, required: true },
  potentialWin: { type: Number, required: true },

  /* ---------- RESULT ---------- */
  isCorrect: { type: Boolean },
  pointsEarned: { type: Number, default: 0 },
  winAmount: { type: Number, default: 0 },

  settled: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

schema.index(
  { userId: 1, contestId: 1, predictionId: 1 },
  { unique: true }
);

export const UserPrediction = model<IUserPrediction>(
  "UserPrediction",
  schema
);
