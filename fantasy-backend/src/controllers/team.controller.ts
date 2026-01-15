import { Response } from "express";
import { TeamService } from "../services/team.service";
import { success, error } from "../utils/ApiResponse";
import { mapUserTeam } from "../mappers/userTeam.mapper";
import { UserTeam } from "../models/UserTeam.model";

export const createTeam = async (req: any, res: Response) => {
  try {
    const team = await TeamService.createTeam({
      ...req.body,
      userId: req.user.userId
    });

    return success(res, mapUserTeam(team), "Team created", 201);
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};

export const getMyTeam = async (req: any, res: Response) => {
  try {
    const { contestId } = req.params;

    const team = await UserTeam.findOne({
      contestId,
      userId: req.user.userId
    }).lean();

    if (!team) {
      return error(res, "Team not found", 404);
    }

    return success(res, mapUserTeam(team), "Team fetched");
  } catch (err: any) {
    return error(res, err.message, 500);
  }
};
