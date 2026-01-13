import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import contestRoutes from "./routes/contest.routes";
import walletRoutes from "./routes/wallet.routes";
import predictionRoutes from "./routes/prediction.routes";
import { apiLimiter } from "./middlewares/rateLimit.middleware";
import healthRoutes from "./routes/health.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

import adminRoutes from "./routes/admin.routes";
import observabilityRoutes from "./routes/observability.routes";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import { metricsMiddleware } from "./middlewares/metrics.middleware";

import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { resultQueue } from "./queues/result.queue";

const app = express();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(resultQueue)],
  serverAdapter
});



// app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use(metricsMiddleware);
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Fantasy API is running",
  });
});
app.use("/admin", adminRoutes);
app.use("/admin/queues", serverAdapter.getRouter());
app.use("/observability", observabilityRoutes);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/contests", contestRoutes);

app.use("/wallet", walletRoutes);
app.use("/predictions", predictionRoutes);
app.use(apiLimiter);
app.use("/health", healthRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Swagger Docs
// if (process.env.NODE_ENV !== "production") {
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   }


app.use(errorHandler);

export default app;
