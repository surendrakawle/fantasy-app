"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.httpRequestDuration = exports.httpRequestCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
prom_client_1.default.collectDefaultMetrics();
exports.httpRequestCounter = new prom_client_1.default.Counter({
    name: "http_requests_total",
    help: "Total HTTP requests",
    labelNames: ["method", "route", "status"]
});
exports.httpRequestDuration = new prom_client_1.default.Histogram({
    name: "http_request_duration_seconds",
    help: "HTTP request duration",
    buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});
exports.register = prom_client_1.default.register;
