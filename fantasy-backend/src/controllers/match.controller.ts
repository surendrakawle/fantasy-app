import { Request, Response } from "express";
import { MatchService } from "../services/match.service";
import { success, error } from "../utils/ApiResponse";
import { mapMatch } from "../mappers/match.mapper";

/* ---------- CREATE ---------- */
export const createMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const match = await MatchService.create(req.body);
    return success(res, mapMatch(match), "Match created");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------- LIST ---------- */
export const listMatches = async (
  req: Request,
  res: Response
) => {
  try {
    const filters: any = {};

    if (req.query.leagueId) {
      filters.leagueId = req.query.leagueId;
    }

    if (req.query.status) {
      filters.status = req.query.status;
    }

    const matches = await MatchService.listAll(filters);
    return success(
      res,
      matches.map(mapMatch),
      "Matches fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

/* ---------- GET ---------- */
export const getMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const match = await MatchService.getById(
      req.params.id
    );
    return success(res, mapMatch(match));
  } catch (e: any) {
    return error(res, e.message, 404);
  }
};

/* ---------- UPDATE ---------- */
export const updateMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const match = await MatchService.update(
      req.params.id,
      req.body
    );
    return success(res, mapMatch(match), "Match updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------- DELETE ---------- */
export const deleteMatch = async (
  req: Request,
  res: Response
) => {
  try {
    await MatchService.remove(req.params.id);
    return success(res, null, "Match deleted");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const listUpcomingMatches = async (_req: Request, res: Response) => {
  const matches = await MatchService.listUpcoming();
  return success(res, matches.map(mapMatch));
};


