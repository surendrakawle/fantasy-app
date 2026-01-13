import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes"; // 👈 ROOT ROUTER ONLY
import { swaggerSpec } from "./config/swagger";

import { errorHandler } from "./middlewares/error.middleware";
import { apiLimiter } from "./middlewares/rateLimit.middleware";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import { metricsMiddleware } from "./middlewares/metrics.middleware";

// Bull Board
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { resultQueue } from "./queues/result.queue";
import { maintenanceMiddleware } from "./middlewares/maintenance.middleware"
const app = express();

/* -------------------------------------------------------------------------- */
/*                               Bull Board                                   */
/* -------------------------------------------------------------------------- */
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(resultQueue)],
  serverAdapter
});

/* -------------------------------------------------------------------------- */
/*                             Global Middleware                               */
/* -------------------------------------------------------------------------- */
app.use(
  cors({
    origin: "*", // ⚠️ restrict in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(maintenanceMiddleware);
app.use(express.json());
app.use(httpLogger);
app.use(metricsMiddleware);

/* -------------------------------------------------------------------------- */
/*                               Rate Limiter                                  */
/* -------------------------------------------------------------------------- */
app.use("/api", apiLimiter); // ✅ APIs only

/* -------------------------------------------------------------------------- */
/*                                 API Routes                                  */
/* -------------------------------------------------------------------------- */
app.use("/api", routes); // 👈 THIS IS THE ONLY ROUTE MOUNT REQUIRED

/* -------------------------------------------------------------------------- */
/*                               Non-API Routes                                */
/* -------------------------------------------------------------------------- */
app.use("/admin/queues", serverAdapter.getRouter());

/* -------------------------------------------------------------------------- */
/*                                Swagger Docs                                 */
/* -------------------------------------------------------------------------- */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* -------------------------------------------------------------------------- */
/*                             Error Handler (LAST)                             */
/* -------------------------------------------------------------------------- */
app.use(errorHandler);

export default app;
