import { Request, Response } from "express";
import { MatchService } from "../services/match.service";
import { mapMatch } from "../mappers/match.mapper";
import { success, error } from "../utils/ApiResponse";

/* ---------------- ADMIN ---------------- */

export const createMatch = async (req: Request, res: Response) => {
  try {
    const match = await MatchService.create(req.body);
    return success(res, mapMatch(match), "Match created", 201);
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    const match = await MatchService.update(req.params.id, req.body);
    return success(res, mapMatch(match), "Match updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const deleteMatch = async (req: Request, res: Response) => {
  try {
    const match = await MatchService.delete(req.params.id);
    return success(res, mapMatch(match), "Match deleted");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------------- USER ---------------- */

export const getMatch = async (req: Request, res: Response) => {
  try {
    const match = await MatchService.getById(req.params.id);
    return success(res, mapMatch(match));
  } catch (e: any) {
    return error(res, e.message, 404);
  }
};

export const listUpcomingMatches = async (_req: Request, res: Response) => {
  const matches = await MatchService.listUpcoming();
  return success(res, matches.map(mapMatch));
};

export const listAllMatches = async (_req: Request, res: Response) => {
  const matches = await MatchService.listAll();
  return success(res, matches.map(mapMatch));
};
