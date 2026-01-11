import Redis from "ioredis";
import { env } from "./env";

const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  db: env.REDIS_DB,
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

export default redis;
