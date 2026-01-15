import { Response } from "express";
import { PlayerStats } from "../models/PlayerStats.model";
import { success, error } from "../utils/apiResponse";
import { mapPlayerStats } from "../mappers/playerStats.mapper";

export const upsertPlayerStats = async (req: any, res: Response) => {
  try {
    const { matchId, playerId } = req.body;

    const stats = await PlayerStats.findOneAndUpdate(
      { matchId, playerId },
      req.body,
      { upsert: true, new: true }
    );

    return success(
      res,
      mapPlayerStats(stats),
      "Player stats saved"
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};
