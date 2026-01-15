// controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { mapAuthResponse } from "../mappers/auth.mapper";
import { success, error } from "../utils/ApiResponse1";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const { user, token: jwtToken } =
      await AuthService.googleLogin(token);

    return success(
      res,
      mapAuthResponse(user, jwtToken),
      "Login successful",
      200
    );

  } catch (err: any) {
    return error(
      res,
      err.message || "Google authentication failed",
      err.message === "Google token is required" ? 400 : 401
    );
  }
};
