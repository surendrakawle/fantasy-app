import { Schema, model, Types } from "mongoose";

export interface IPrediction {
  _id: any;
  contestId: Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer?: string;
  points?: number;
  order: number;
  odds?: number;
  createdAt: Date;
  status: string;
}

const schema = new Schema<IPrediction>({
  contestId: { type: Schema.Types.ObjectId, ref: "Contest", index: true, required: true },

  question: { type: String, required: true },
  options: { type: [String], required: true },

  correctAnswer: { type: String },
  points: { type: Number },
  odds: { type: Number },
  order: { type: Number, default: 0 },
  status: { type: String, default: 'OPEN' },

  createdAt: { type: Date, default: Date.now }
});

export const Prediction = model<IPrediction>("Prediction", schema);
