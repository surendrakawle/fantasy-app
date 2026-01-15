import Redis from "ioredis";
import { RedisOptions } from "bullmq";
import { env } from "./env";

/* ------------------ BullMQ Redis Options ------------------ */
export const redisOptions: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  db: env.REDIS_DB,
  maxRetriesPerRequest: null, // REQUIRED for BullMQ
  enableReadyCheck: false     // REQUIRED for BullMQ
};

/* ------------------ ioredis Client ------------------ */
export const redisClient = new Redis({
  ...redisOptions,
  lazyConnect: true,
  retryStrategy(times) {
    return Math.min(times * 100, 2000);
  }
});

redisClient.on("connect", () => {
  console.log("🔌 Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

redisClient.on("close", () => {
  console.warn("⚠️ Redis connection closed");
});

export default redisClient;
