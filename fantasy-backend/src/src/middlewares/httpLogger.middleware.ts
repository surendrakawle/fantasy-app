import morgan from "morgan";
import { logger } from "../config/logger";

export const httpLogger = morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim())
  }
});
