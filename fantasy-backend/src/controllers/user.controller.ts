import { Request, Response } from "express";
import { User } from "../models/User.model";

export const getMe = async (req: any, res: Response) => {
  const user = await User.findById(req.user.userId).select("-googleId");
  res.json(user);
};
