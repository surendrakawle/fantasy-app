import { Response, NextFunction } from "express";
import { error } from "../utils/apiResponse";

export const adminOnly = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return error(res, "Unauthorized", 401);
    }
    console.log(req.user)

    if (req.user?.role !== "ADMIN") {
      return error(res, "Admin access required", 403);
    }

    next();
  } catch (err) {
    return error(res, "Authorization failed", 500);
  }
};
