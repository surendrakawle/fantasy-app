"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const adminOnly = (req, res, next) => {
    try {
        if (!req.user) {
            return (0, apiResponse_1.error)(res, "Unauthorized", 401);
        }
        console.log(req.user);
        if (req.user?.role !== "ADMIN") {
            return (0, apiResponse_1.error)(res, "Admin access required", 403);
        }
        next();
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, "Authorization failed", 500);
    }
};
exports.adminOnly = adminOnly;
