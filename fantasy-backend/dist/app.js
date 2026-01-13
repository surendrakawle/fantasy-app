"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const contest_routes_1 = __importDefault(require("./routes/contest.routes"));
const wallet_routes_1 = __importDefault(require("./routes/wallet.routes"));
const prediction_routes_1 = __importDefault(require("./routes/prediction.routes"));
const rateLimit_middleware_1 = require("./middlewares/rateLimit.middleware");
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const observability_routes_1 = __importDefault(require("./routes/observability.routes"));
const httpLogger_middleware_1 = require("./middlewares/httpLogger.middleware");
const metrics_middleware_1 = require("./middlewares/metrics.middleware");
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_2 = require("@bull-board/express");
const result_queue_1 = require("./queues/result.queue");
const app = (0, express_1.default)();
const serverAdapter = new express_2.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(result_queue_1.resultQueue)],
    serverAdapter
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(httpLogger_middleware_1.httpLogger);
app.use(metrics_middleware_1.metricsMiddleware);
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Fantasy API is running",
    });
});
app.use("/admin", admin_routes_1.default);
app.use("/admin/queues", serverAdapter.getRouter());
app.use("/observability", observability_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/contests", contest_routes_1.default);
app.use("/wallet", wallet_routes_1.default);
app.use("/predictions", prediction_routes_1.default);
app.use(rateLimit_middleware_1.apiLimiter);
app.use("/health", health_routes_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Swagger Docs
// if (process.env.NODE_ENV !== "production") {
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   }
app.use(error_middleware_1.errorHandler);
exports.default = app;
