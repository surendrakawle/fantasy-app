import { Request, Response, NextFunction } from "express";
import { MasterConfigService } from "../services/masterConfig.service";
import { error } from "../utils/ApiResponse";

export const maintenanceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const config = await MasterConfigService.getConfig();

  if (config.maintenance?.enabled) {
    const lang =
      req.headers["accept-language"] === "hi" ? "hi" : "en";

    return error(
      res,
      config.maintenance.message?.[lang] ||
        "Site under maintenance",
      503
    );
  }

  next();
};
