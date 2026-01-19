import { Request, Response } from "express";
import { UserPredictionService } from "../services/userPrediction.service";
import { mapUserPrediction } from "../mappers/userPrediction.mapper";
import { success, error } from "../utils/ApiResponse";

/* ---------- SUBMIT ---------- */
export const submitPrediction = async (req: any, res: Response) => {
  try {
    const { contestId, predictionId, selectedAnswer, amount } = req.body;

    const up = await UserPredictionService.submit(
      req.user.userId,
      contestId,
      predictionId,
      selectedAnswer,
      amount
    );

    return success(res, mapUserPrediction(up), "Prediction submitted", 201);
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------- LIST USER PREDICTIONS ---------- */
export const listMyPredictions = async (req: any, res: Response) => {
  try {
    const { contestId } = req.params;

    const list = await UserPredictionService.listByContest(
      req.user.userId,
      contestId
    );

    return success(res, list.map(mapUserPrediction));
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
