"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceMiddleware = void 0;
const masterConfig_service_1 = require("../services/masterConfig.service");
const apiResponse_1 = require("../utils/apiResponse");
const maintenanceMiddleware = async (req, res, next) => {
    const config = await masterConfig_service_1.MasterConfigService.getConfig();
    if (config.maintenance?.enabled) {
        const lang = req.headers["accept-language"] === "hi" ? "hi" : "en";
        return (0, apiResponse_1.error)(res, config.maintenance.message?.[lang] ||
            "Site under maintenance", 503);
    }
    next();
};
exports.maintenanceMiddleware = maintenanceMiddleware;
