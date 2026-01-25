import { Schema, model, Types } from "mongoose";

/* ================= TYPES ================= */

export type PredictionStatus =
  | "ACTIVE"
  | "LOCKED"
  | "RESULT_DECLARED";

export interface IPredictionOption {
  label: string;
  odds: number;
}

export interface IPrediction {
  _id: Types.ObjectId;

  contestId: Types.ObjectId;

  question: string;

  options: IPredictionOption[];

  correctAnswer?: string;

  order: number;

  status: PredictionStatus;

  createdAt: Date;
}

/* ================= SCHEMA ================= */

const PredictionOptionSchema = new Schema<IPredictionOption>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    odds: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false } // embedded, no separate _id
);

const PredictionSchema = new Schema<IPrediction>(
  {
    contestId: {
      type: Schema.Types.ObjectId,
      ref: "Contest",
      index: true,
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [PredictionOptionSchema],
      required: true,
      validate: {
        validator: (v: IPredictionOption[]) => v.length >= 2,
        message: "At least two options are required",
      },
    },

    correctAnswer: {
      type: String,
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "LOCKED", "RESULT_DECLARED"],
      default: "ACTIVE",
      index: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

/* ================= INDEXES ================= */

PredictionSchema.index({ contestId: 1, order: 1 });
PredictionSchema.index({ contestId: 1, status: 1 });

/* ================= MODEL ================= */

export const Prediction = model<IPrediction>(
  "Prediction",
  PredictionSchema
);
