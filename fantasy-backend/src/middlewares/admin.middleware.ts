import { Response, NextFunction } from "express";
import { Admin } from "../models/Admin.model";

export const adminOnly = async (req: any, res: Response, next: NextFunction) => {
  const admin = await Admin.findOne({ userId: req.user.userId });
  if (!admin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
