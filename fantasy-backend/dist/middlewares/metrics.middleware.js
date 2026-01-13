"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const metrics_1 = require("../config/metrics");
const metricsMiddleware = (req, res, next) => {
    const end = metrics_1.httpRequestDuration.startTimer();
    res.on("finish", () => {
        metrics_1.httpRequestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode
        });
        end();
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
