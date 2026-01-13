"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../config/logger");
const errorHandler = (err, _req, res, _next) => {
    logger_1.logger.error({
        message: err.message,
        stack: err.stack
    });
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
};
exports.errorHandler = errorHandler;
