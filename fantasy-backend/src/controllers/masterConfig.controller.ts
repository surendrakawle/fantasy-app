import { Request, Response } from "express";
import { MasterConfigService } from "../services/masterConfig.service";
import { mapMasterConfig } from "../mappers/masterConfig.mapper";
import { success, error } from "../utils/ApiResponse";

/* -------------------- PUBLIC -------------------- */
export const getMasterConfig = async (
  _req: Request,
  res: Response
) => {
  try {
    const config = await MasterConfigService.getConfig();
    return success(
      res,
      mapMasterConfig(config),
      "Master config fetched"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};

/* -------------------- ADMIN -------------------- */
export const updateMasterConfig = async (
  req: Request,
  res: Response
) => {
  try {
    const config = await MasterConfigService.updateConfig(req.body);
    return success(
      res,
      mapMasterConfig(config),
      "Master config updated"
    );
  } catch (e: any) {
    return error(res, e.message, 400);
  }
};
