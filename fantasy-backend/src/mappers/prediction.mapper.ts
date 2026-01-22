import { IPrediction } from "../models/Prediction.model";

export const mapPrediction = (p: IPrediction) => ({
  id: p?._id,
  contestId: p.contestId,

  question: p.question,
  options: p.options,

  correctAnswer: p.correctAnswer,
  points: p.points,
  order: p.order,
  odds: p.odds,
  createdAt: p.createdAt,
  status: p.status
});
