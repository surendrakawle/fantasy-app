"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
const ApiResponse_1 = require("./ApiResponse");
function sendResponse(res, message, data) {
    return res.json(new ApiResponse_1.ApiResponse(message, data));
}
