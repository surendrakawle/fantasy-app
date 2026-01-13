import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signToken(payload: object, expiresIn = "7d") {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET);
}
