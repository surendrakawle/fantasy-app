import { Response } from "express";
import { ApiResponse } from "./ApiResponse";

export function sendResponse<T>(
  res: Response,
  message: string,
  data?: T
) {
  return res.json(new ApiResponse(message, data));
}
