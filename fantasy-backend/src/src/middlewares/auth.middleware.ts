import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  
  // ✅ BYPASS AUTH FOR ICT / LOCAL
  if (env.NODE_ENV === "ict" && process.env.AUTH_BYPASS === "true") {
    req.user = {
      userId: "TEST_USER_ID",
      role: "ADMIN"
    };
    return next();
  }

  // 🔐 PROD AUTH
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ "success": false, message: "Token missing" });
  }
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ "success": false, message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    if (req.user.isBlocked) {
      return res.status(403).json({ "success": false, message: "Account blocked" });
    }
    next();
  } catch {
    res.status(401).json({ "success": false, message: "Invalid token" });
  }
};
