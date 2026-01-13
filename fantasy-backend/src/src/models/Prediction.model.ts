import { Schema, model, Types } from "mongoose";

export interface IPrediction {
  contestId: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer?: string;
  points: number;
  order: number; // UI order
}

const schema = new Schema<IPrediction>({
  contestId: { type: Schema.Types.ObjectId, ref: "Contest", index: true },
  question: { type: String, required: true },
  options: { type: [String], required: true }, // ["Team A", "Team B"] or ["YES", "NO"]
  correctAnswer: String,
  points: { type: Number, default: 10 },
  order: { type: Number, default: 0 }, // UI order
});

export const Prediction = model<IPrediction>("Prediction", schema);

