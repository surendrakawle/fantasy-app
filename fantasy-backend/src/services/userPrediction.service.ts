import mongoose from "mongoose";
import { UserPrediction } from "../models/UserPrediction.model";
import { Contest } from "../models/Contest.model";
import { Prediction } from "../models/Prediction.model";
import { WalletService } from "./wallet.service";

export class UserPredictionService {

  /* ---------- SUBMIT PREDICTION ---------- */
  static async submit(
    userId: string,
    contestId: string,
    predictionId: string,
    selectedAnswer: string,
    amount: number
  ) {
    const contest = await Contest.findById(contestId);
    if (!contest || contest.status !== "OPEN") {
      throw new Error("Contest not available");
    }

    if (contest.contestType !== "PREDICTION") {
      throw new Error("Invalid contest type");
    }

    const prediction = await Prediction.findById(predictionId);
    if (!prediction) throw new Error("Prediction not found");

    const multiplier = contest.multiplier!;
    const potentialWin = amount * multiplier;

    // 🔥 Debit wallet as PREDICT
    await WalletService.debitWallet(
      userId,
      amount,
      `Prediction ${predictionId}`,
      "PREDICT"
    );

    return UserPrediction.create({
      userId: new mongoose.Types.ObjectId(userId),
      contestId,
      predictionId,
      selectedAnswer,
      amount,
      multiplier,
      potentialWin
    });
  }

  /* ---------- SETTLE RESULT ---------- */
  static async settlePrediction(
    userPredictionId: string,
    correctAnswer: string,
    points: number
  ) {
    const up = await UserPrediction.findById(userPredictionId);
    if (!up || up.settled) return;

    const isCorrect = up.selectedAnswer === correctAnswer;

    let winAmount = 0;
    let pointsEarned = 0;

    if (isCorrect) {
      winAmount = up.amount * up.multiplier;
      pointsEarned = points;

      // 🔥 Credit wallet as WIN
      await WalletService.creditWallet(
        up.userId.toString(),
        winAmount,
        "Prediction win",
        "WIN"
      );
    }

    up.isCorrect = isCorrect;
    up.pointsEarned = pointsEarned;
    up.winAmount = winAmount;
    up.settled = true;

    await up.save();
  }

  /* ---------- USER VIEW ---------- */
  static async listByContest(userId: string, contestId: string) {
    return UserPrediction.find({ userId, contestId })
      .sort({ createdAt: -1 });
  }
}
