import { Request, Response } from "express";
import { CommonSeedService } from "../../services/seed/common";
import { success, error } from "../../utils/ApiResponse";

export const commonSeed = async (
  req: Request,
  res: Response
) => {
  try {
    if (process.env.NODE_ENV === "production") {
      return error(
        res,
        "Seeding disabled in production",
        403
      );
    }

    const { file, model, uniqueBy } = req.body;

    if (!file || !model) {
      return error(
        res,
        "file and model are required",
        400
      );
    }

    const result = await CommonSeedService.seed({
      file,
      model,
      uniqueBy
    });

    return success(
      res,
      result,
      "Seed executed successfully"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};
