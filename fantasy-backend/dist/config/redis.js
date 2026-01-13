"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
const redis = new ioredis_1.default({
    host: env_1.env.REDIS_HOST,
    port: env_1.env.REDIS_PORT,
    password: env_1.env.REDIS_PASSWORD,
    db: env_1.env.REDIS_DB,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true,
    retryStrategy(times) {
        return Math.min(times * 100, 2000);
    }
});
redis.on("connect", () => {
    console.log("🔌 Redis connecting...");
});
redis.on("ready", () => {
    console.log("✅ Redis connected");
});
redis.on("error", (err) => {
    console.error("❌ Redis error:", err.message);
});
redis.on("close", () => {
    console.warn("⚠️ Redis connection closed");
});
exports.default = redis;
