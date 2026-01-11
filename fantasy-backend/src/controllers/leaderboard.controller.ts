import { Request, Response } from "express";
import { getTopUsers } from "../services/leaderboard.service";

export const getLeaderboard = async (req: Request, res: Response) => {
  const { contestId } = req.params;
  const leaderboard = await getTopUsers(contestId, 10);
  res.json(leaderboard);
};
