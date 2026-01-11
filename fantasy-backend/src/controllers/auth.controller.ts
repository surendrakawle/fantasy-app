import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User.model";
import { Wallet } from "../models/Wallet.model";
import { verifyGoogleToken } from "../services/googleAuth.service";
import { env } from "../config/env";
import { Role } from "../models/Role.model";



export const googleLogin = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token required" });
  }

  const payload = await verifyGoogleToken(token);
  if (!payload?.email) {
    return res.status(401).json({ message: "Invalid Google token" });
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    const userRole = await Role.findOne({ name: "USER" });
    user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        role: userRole!._id
    });

    await Wallet.create({ userId: user._id });
  }

  const jwtToken = jwt.sign(
    { userId: user._id },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token: jwtToken });
};
