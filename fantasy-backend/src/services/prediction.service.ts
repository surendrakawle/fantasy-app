import { Prediction } from "../models/Prediction.model";
import mongoose from "mongoose";

export class PredictionService {

  /* ---------- ADMIN ---------- */

  static async create(data: any) {
    return Prediction.create(data);
  }

  static async update(predictionId: string, data: any) {
    const p = await Prediction.findByIdAndUpdate(
      predictionId,
      data,
      { new: true }
    );

    if (!p) throw new Error("Prediction not found");
    return p;
  }

  static async delete(predictionId: string) {
    const p = await Prediction.findByIdAndDelete(predictionId);
    if (!p) throw new Error("Prediction not found");
    return p;
  }

  static async listByContest(contestId: string) {
    return Prediction.find({ contestId:new mongoose.Types.ObjectId(contestId) }).sort({ order: 1 });
  }

  static async publishAnswer(predictionId: string, correctAnswer: string) {
    const p = await Prediction.findById(predictionId);
    if (!p) throw new Error("Prediction not found");

    if (!p.options.includes(correctAnswer)) {
      throw new Error("Correct answer must be one of the options");
    }

    p.correctAnswer = correctAnswer;
    await p.save();
    return p;
  }
}
