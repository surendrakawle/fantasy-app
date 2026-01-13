import { Request, Response } from "express";
import { ContestService } from "../services/contest.service";
import { success, error } from "../utils/apiResponse";
import { mapContest } from "../mappers/contest.mapper";

/* -------------------- LIST CONTESTS -------------------- */
export const listContests = async (_req: Request, res: Response) => {
  try {
    const contests = await ContestService.listOpenContests();
    return success(
      res,
      contests.map(mapContest),
      "Open contests fetched"
    );
  } catch (err: any) {
    return error(res, err.message);
  }
};

/* -------------------- JOIN CONTEST -------------------- */
export const joinContest = async (req: any, res: Response) => {
  try {
    const contestId = req.params.id;
    const userId = req.user.userId;

    const contest = await ContestService.joinContest(userId, contestId);

    return success(
      res,
      mapContest(contest),
      "Contest joined successfully"
    );
  } catch (err: any) {
    const status =
      err.message === "Already joined contest" ? 409 : 400;

    return error(res, err.message, status);
  }
};
