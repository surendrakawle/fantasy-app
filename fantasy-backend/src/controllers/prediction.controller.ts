import { Request, Response } from "express";
import { PredictionService } from "../services/prediction.service";
import { mapPrediction } from "../mappers/prediction.mapper";
import { success, error } from "../utils/ApiResponse";

/* ---------------- ADMIN ---------------- */

export const createPrediction = async (req: Request, res: Response) => {
  try {
    const p = await PredictionService.create(req.body);
    return success(res, mapPrediction(p), "Prediction created", 201);
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const updatePrediction = async (req: Request, res: Response) => {
  try {
    const p = await PredictionService.update(req.params.id, req.body);
    return success(res, mapPrediction(p), "Prediction updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const deletePrediction = async (req: Request, res: Response) => {
  try {
    const p = await PredictionService.delete(req.params.id);
    return success(res, mapPrediction(p), "Prediction deleted");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const publishCorrectAnswer = async (req: Request, res: Response) => {
  try {
    const { correctAnswer } = req.body;

    const p = await PredictionService.publishAnswer(
      req.params.id,
      correctAnswer
    );

    return success(res, mapPrediction(p), "Correct answer published");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------------- USER ---------------- */

export const listPredictionsByContest = async (req: Request, res: Response) => {
  try {
    const list = await PredictionService.listByContest(req.params.contestId);
    return success(res, list.map(mapPrediction));
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
