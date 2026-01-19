import { Request, Response } from "express";
import { ContestService } from "../services/contest.service";
import { mapContest } from "../mappers/contest.mapper";
import { success, error } from "../utils/ApiResponse";

/* ---------------- ADMIN ---------------- */

export const createContest = async (req: Request, res: Response) => {
  try {
    const contest = await ContestService.create(req.body);
    return success(res, mapContest(contest), "Contest created", 201);
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const updateContest = async (req: Request, res: Response) => {
  try {
    const contest = await ContestService.update(req.params.id, req.body);
    return success(res, mapContest(contest), "Contest updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const deleteContest = async (req: Request, res: Response) => {
  try {
    const contest = await ContestService.delete(req.params.id);
    return success(res, mapContest(contest), "Contest deleted");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const listAllContestsAdmin = async (_req: Request, res: Response) => {
  const contests = await ContestService.listAll();
  return success(res, contests.map(mapContest));
};

/* ---------------- USER / PUBLIC ---------------- */

export const listOpenContests = async (_req: Request, res: Response) => {
  const contests = await ContestService.listOpen();
  return success(res, contests.map(mapContest));
};

export const listContestsByMatch = async (req: Request, res: Response) => {
  try {
    const contests = await ContestService.listByMatch(req.params.matchId);
    return success(res, contests.map(mapContest));
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const getContest = async (req: Request, res: Response) => {
  try {
    const contest = await ContestService.getById(req.params.id);
    return success(res, mapContest(contest));
  } catch (e: any) {
    return error(res, e.message, 404);
  }
};
