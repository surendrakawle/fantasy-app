import { Request, Response } from "express";
import { TeamService } from "../../services/masterTeam.service";
import { success, error } from "../../utils/ApiResponse";
import { mapTeam } from "../../mappers/team.mapper";

/* ---------- CREATE ---------- */
export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = await TeamService.create(req.body);
    return success(res, mapTeam(team), "Team created");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------- LIST ---------- */
export const listTeams = async (req: Request, res: Response) => {
  try {
    const activeOnly = req.query.activeOnly !== "false";
    const teams = await TeamService.list(activeOnly);
    return success(res, teams.map(mapTeam), "Teams fetched");
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

/* ---------- GET ---------- */
export const getTeam = async (req: Request, res: Response) => {
  try {
    const team = await TeamService.getById(req.params.id);
    return success(res, mapTeam(team));
  } catch (e: any) {
    return error(res, e.message, 404);
  }
};

/* ---------- UPDATE ---------- */
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await TeamService.update(req.params.id, req.body);
    return success(res, mapTeam(team), "Team updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

/* ---------- DELETE ---------- */
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    await TeamService.remove(req.params.id);
    return success(res, null, "Team deleted");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
