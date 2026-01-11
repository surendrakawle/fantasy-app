import { Schema, model, Types } from "mongoose";

export interface IPrediction {
  contestId: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer?: string;
  points: number;
}

const schema = new Schema<IPrediction>({
  contestId: { type: Schema.Types.ObjectId, ref: "Contest", index: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: String,
  points: { type: Number, default: 10 }
});

export const Prediction = model<IPrediction>("Prediction", schema);
