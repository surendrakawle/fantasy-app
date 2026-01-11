import { logger } from "../config/logger";

export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
  logger.error({
    message: err.message,
    stack: err.stack
  });

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
};
