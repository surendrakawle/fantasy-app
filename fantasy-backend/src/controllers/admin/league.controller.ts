import { Request, Response } from "express";
import { LeagueService } from "../../services/league.service";
import { success, error } from "../../utils/ApiResponse";
import { mapLeague } from "../../mappers/league.mapper";

/* ---------------- CREATE ---------------- */
export const createLeague = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, shortName, season, image } = req.body;

    if (!name || !shortName || !season) {
      return error(res, "Missing required fields", 400);
    }

    const league = await LeagueService.create({
      name,
      shortName,
      season, 
      image
    });

    return success(res, mapLeague(league), "League created");
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

/* ---------------- LIST ---------------- */
export const listLeagues = async (
  req: Request,
  res: Response
) => {
  try {
    const includeInactive =
      req.query.includeInactive === "true";

    const leagues =
      await LeagueService.listAll(includeInactive);

    return success(
      res,
      leagues.map(mapLeague),
      "Leagues fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

/* ---------------- UPDATE ---------------- */
export const updateLeague = async (
  req: Request,
  res: Response
) => {
  try {
    const league = await LeagueService.update(
      req.params.id,
      req.body
    );

    return success(res, mapLeague(league), "League updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------------- DELETE ---------------- */
export const deleteLeague = async (
  req: Request,
  res: Response
) => {
  try {
    await LeagueService.delete(req.params.id);
    return success(res, null, "League deleted");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
