import { Schema, model, Types } from "mongoose";

export interface IUserPrediction {
  userId: Types.ObjectId;
  contestId: Types.ObjectId;
  predictionId: Types.ObjectId;
  selectedAnswer: string;
  isCorrect?: boolean;
  pointsEarned: number;
}

const schema = new Schema<IUserPrediction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  contestId: { type: Schema.Types.ObjectId, ref: "Contest", index: true },
  predictionId: { type: Schema.Types.ObjectId, ref: "Prediction" },
  selectedAnswer: { type: String, required: true },
  isCorrect: Boolean,
  pointsEarned: { type: Number, default: 0 }
});

schema.index(
  { userId: 1, contestId: 1, predictionId: 1 },
  { unique: true }
);

export const UserPrediction = model<IUserPrediction>(
  "UserPrediction",
  schema
);
