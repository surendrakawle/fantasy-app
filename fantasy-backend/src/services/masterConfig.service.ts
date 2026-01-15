import { MasterConfig } from "../models/MasterConfig.model";
import redis from "../config/redis";

const GLOBAL_KEY = "GLOBAL_SETTINGS";
const CACHE_KEY = "master:config";
const CACHE_TTL = 60 * 10; // 10 minutes

export class MasterConfigService {
  /* ---------------- PUBLIC READ (CACHED) ---------------- */
  static async getConfig() {
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    let config = await MasterConfig.findOne({ key: GLOBAL_KEY }).lean();

    if (!config) {
      config = await MasterConfig.create({ key: GLOBAL_KEY });
    }

    await redis.set(
      CACHE_KEY,
      JSON.stringify(config),
      "EX",
      CACHE_TTL
    );

    return config;
  }

  /* ---------------- ADMIN UPDATE ---------------- */
  static async updateConfig(data: any) {
    const updated = await MasterConfig.findOneAndUpdate(
      { key: GLOBAL_KEY },
      { $set: data },
      { new: true, upsert: true }
    ).lean();

    // Invalidate cache
    await redis.del(CACHE_KEY);

    return updated;
  }
}
