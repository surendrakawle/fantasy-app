import { Request, Response } from "express";
import { PlayerService } from "../services/player.service";
import { mapPlayer } from "../mappers/player.mapper";
import { success, error } from "../utils/apiResponse";

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const player = await PlayerService.create(req.body);
    return success(res, mapPlayer(player), "Player created", 201);
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const listPlayers = async (req: Request, res: Response) => {
  try {
    const { team, role } = req.query;

    const filters: any = {};
    if (team) filters.team = team;
    if (role) filters.role = role;

    const players = await PlayerService.list(filters);
    return success(
      res,
      players.map(mapPlayer),
      "Players fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

export const getPlayer = async (req: Request, res: Response) => {
  try {
    const player = await PlayerService.getById(req.params.id);
    return success(res, mapPlayer(player), "Player fetched");
  } catch (e: any) {
    return error(res, e.message, 404);
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const player = await PlayerService.update(
      req.params.id,
      req.body
    );
    return success(res, mapPlayer(player), "Player updated");
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};

export const deactivatePlayer = async (req: Request, res: Response) => {
  try {
    const player = await PlayerService.deactivate(req.params.id);
    return success(
      res,
      mapPlayer(player),
      "Player deactivated"
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
