import { Request, Response } from "express";
import { LeaderboardService } from "../services/leaderboard.service";
import { mapLeaderboard } from "../mappers/leaderboard.mapper";
import { success, error } from "../utils/ApiResponse1";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { contestId } = req.params;

    const rawLeaderboard =
      await LeaderboardService.getTopUsers(contestId, 10);

    return success(
      res,
      mapLeaderboard(rawLeaderboard),
      "Leaderboard fetched"
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};
export const getMyRank = async (req: any, res: Response) => {
  try {
    const { contestId } = req.params;
    const userId = req.user.userId;

    const rank = await LeaderboardService.getUserRank(
      contestId,
      userId
    );

    return success(
      res,
      { rank },
      "User rank fetched"
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};

