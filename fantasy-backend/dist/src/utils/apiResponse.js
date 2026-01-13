"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = (res, data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};
exports.success = success;
const error = (res, message = "Something went wrong", statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message
    });
};
exports.error = error;
