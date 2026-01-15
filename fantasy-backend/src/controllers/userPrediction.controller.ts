import { Response } from "express";
import { UserPredictionService } from "../services/userPrediction.service";
import { mapUserPrediction } from "../mappers/userPrediction.mapper";
import { success, error } from "../utils/ApiResponse1";

export const getMyPredictionsByContest = async (
  req: any,
  res: Response
) => {
  try {
    const { contestId } = req.params;

    if (!contestId) {
      return error(res, "contestId is required", 400);
    }

    const rows =
      await UserPredictionService.getUserPredictionsByContest(
        req.user.userId,
        contestId
      );

    return success(
      res,
      rows.map(mapUserPrediction),
      "User predictions fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};
