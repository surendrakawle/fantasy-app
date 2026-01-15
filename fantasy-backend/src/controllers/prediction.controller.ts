import { Request, Response } from "express";
import { PredictionService } from "../services/prediction.service";
import { mapUserPrediction } from "../mappers/userPrediction.mapper";
import { success, error } from "../utils/ApiResponse";
import { mapPrediction } from "../mappers/prediction.mapper";

export const submitPrediction = async (req: any, res: Response) => {
  try {
    const { contestId, predictionId, selectedAnswer } = req.body;
    const userId = req.user.userId;

    const userPrediction =
      await PredictionService.submitPrediction({
        userId,
        contestId,
        predictionId,
        selectedAnswer
      });

    return success(
      res,
      mapUserPrediction(userPrediction),
      "Prediction submitted",
      201
    );
  } catch (err: any) {
    const status =
      err.message === "Prediction already submitted" ? 409 : 400;

    return error(res, err.message, status);
  }
};
export const getPredictionsByContest = async (
  req: Request,
  res: Response
) => {
  try {
    const { contestId } = req.params;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 50);

    if (!contestId) {
      return error(res, "contestId is required", 400);
    }

    const { predictions, pagination } =
      await PredictionService.getByContestId(
        contestId,
        page,
        limit
      );

    return success(
      res,
      {
        predictions: predictions.map(mapPrediction),
        pagination
      },
      "Predictions fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

