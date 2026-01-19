import { IUserPrediction } from "../models/UserPrediction.model";

export const mapUserPrediction = (p: IUserPrediction) => ({
  id: p._id,
  contestId: p.contestId,
  predictionId: p.predictionId,

  selectedAnswer: p.selectedAnswer,

  amount: p.amount,
  multiplier: p.multiplier,
  potentialWin: p.potentialWin,

  isCorrect: p.isCorrect,
  pointsEarned: p.pointsEarned,
  winAmount: p.winAmount,
  settled: p.settled,

  createdAt: p.createdAt
});
