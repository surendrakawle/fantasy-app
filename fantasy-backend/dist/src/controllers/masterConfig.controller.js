"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMasterConfig = exports.getMasterConfig = void 0;
const masterConfig_service_1 = require("../services/masterConfig.service");
const masterConfig_mapper_1 = require("../mappers/masterConfig.mapper");
const apiResponse_1 = require("../utils/apiResponse");
/* -------------------- PUBLIC -------------------- */
const getMasterConfig = async (_req, res) => {
    try {
        const config = await masterConfig_service_1.MasterConfigService.getConfig();
        return (0, apiResponse_1.success)(res, (0, masterConfig_mapper_1.mapMasterConfig)(config), "Master config fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 500);
    }
};
exports.getMasterConfig = getMasterConfig;
/* -------------------- ADMIN -------------------- */
const updateMasterConfig = async (req, res) => {
    try {
        const config = await masterConfig_service_1.MasterConfigService.updateConfig(req.body);
        return (0, apiResponse_1.success)(res, (0, masterConfig_mapper_1.mapMasterConfig)(config), "Master config updated");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.updateMasterConfig = updateMasterConfig;
