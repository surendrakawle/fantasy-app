import { Request, Response, NextFunction } from "express";
import {
  httpRequestCounter,
  httpRequestDuration
} from "../config/metrics";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
    end();
  });

  next();
};
