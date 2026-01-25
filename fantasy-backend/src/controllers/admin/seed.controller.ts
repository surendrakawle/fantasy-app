import { Request, Response } from "express";
import { success, error } from "../../utils/ApiResponse";
import { PlayerSeedService } from "../../services/seed.service";

export const seedPlayers = async (
  req: Request,
  res: Response
) => {
  try {
    const { file } = req.body;

    if (!file) {
      return error(res, "Seed file name is required", 400);
    }

    const result =
      await PlayerSeedService.seedFromFile(file);

    return success(
      res,
      result,
      "Players seeded successfully"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};
