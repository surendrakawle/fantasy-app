"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
const apiResponse_1 = require("./apiResponse");
function sendResponse(res, message, data) {
    return res.json(new apiResponse_1.ApiResponse(message, data));
}
