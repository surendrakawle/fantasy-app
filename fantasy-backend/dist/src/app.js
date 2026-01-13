"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes")); // 👈 ROOT ROUTER ONLY
const swagger_1 = require("./config/swagger");
const error_middleware_1 = require("./middlewares/error.middleware");
const rateLimit_middleware_1 = require("./middlewares/rateLimit.middleware");
const httpLogger_middleware_1 = require("./middlewares/httpLogger.middleware");
const metrics_middleware_1 = require("./middlewares/metrics.middleware");
// Bull Board
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_2 = require("@bull-board/express");
const result_queue_1 = require("./queues/result.queue");
const maintenance_middleware_1 = require("./middlewares/maintenance.middleware");
const app = (0, express_1.default)();
/* -------------------------------------------------------------------------- */
/*                               Bull Board                                   */
/* -------------------------------------------------------------------------- */
const serverAdapter = new express_2.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(result_queue_1.resultQueue)],
    serverAdapter
});
/* -------------------------------------------------------------------------- */
/*                             Global Middleware                               */
/* -------------------------------------------------------------------------- */
app.use((0, cors_1.default)({
    origin: "*", // ⚠️ restrict in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(maintenance_middleware_1.maintenanceMiddleware);
app.use(express_1.default.json());
app.use(httpLogger_middleware_1.httpLogger);
app.use(metrics_middleware_1.metricsMiddleware);
/* -------------------------------------------------------------------------- */
/*                               Rate Limiter                                  */
/* -------------------------------------------------------------------------- */
app.use("/api", rateLimit_middleware_1.apiLimiter); // ✅ APIs only
/* -------------------------------------------------------------------------- */
/*                                 API Routes                                  */
/* -------------------------------------------------------------------------- */
app.use("/api", routes_1.default); // 👈 THIS IS THE ONLY ROUTE MOUNT REQUIRED
/* -------------------------------------------------------------------------- */
/*                               Non-API Routes                                */
/* -------------------------------------------------------------------------- */
app.use("/admin/queues", serverAdapter.getRouter());
/* -------------------------------------------------------------------------- */
/*                                Swagger Docs                                 */
/* -------------------------------------------------------------------------- */
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
/* -------------------------------------------------------------------------- */
/*                             Error Handler (LAST)                             */
/* -------------------------------------------------------------------------- */
app.use(error_middleware_1.errorHandler);
exports.default = app;
