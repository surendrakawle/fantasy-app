import { Request, Response } from "express";
import { UserPrediction } from "../models/UserPrediction.model";

export const submitPrediction = async (req: any, res: Response) => {
  const { contestId, predictionId, selectedAnswer } = req.body;

  await UserPrediction.create({
    userId: req.user.userId,
    contestId,
    predictionId,
    selectedAnswer
  });

  res.json({ message: "Prediction submitted" });
};
