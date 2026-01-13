"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterConfigService = void 0;
const MasterConfig_model_1 = require("../models/MasterConfig.model");
const redis_1 = __importDefault(require("../config/redis"));
const GLOBAL_KEY = "GLOBAL_SETTINGS";
const CACHE_KEY = "master:config";
const CACHE_TTL = 60 * 10; // 10 minutes
class MasterConfigService {
    /* ---------------- PUBLIC READ (CACHED) ---------------- */
    static async getConfig() {
        const cached = await redis_1.default.get(CACHE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }
        let config = await MasterConfig_model_1.MasterConfig.findOne({ key: GLOBAL_KEY }).lean();
        if (!config) {
            config = await MasterConfig_model_1.MasterConfig.create({ key: GLOBAL_KEY });
        }
        await redis_1.default.set(CACHE_KEY, JSON.stringify(config), "EX", CACHE_TTL);
        return config;
    }
    /* ---------------- ADMIN UPDATE ---------------- */
    static async updateConfig(data) {
        const updated = await MasterConfig_model_1.MasterConfig.findOneAndUpdate({ key: GLOBAL_KEY }, { $set: data }, { new: true, upsert: true }).lean();
        // Invalidate cache
        await redis_1.default.del(CACHE_KEY);
        return updated;
    }
}
exports.MasterConfigService = MasterConfigService;
