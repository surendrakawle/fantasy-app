import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "ict"}`;
dotenv.config({ path: envFile });

export const env = {
  // App
  NODE_ENV: process.env.NODE_ENV || "ict",
  PORT: process.env.PORT || 4000,

  // Database
  MONGO_URI: process.env.MONGO_URI as string,

  // Auth
  JWT_SECRET: process.env.JWT_SECRET as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,

  // Redis
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  REDIS_DB: Number(process.env.REDIS_DB) || 0,

  // Ai
  // OPENAI_API_KEY:process.env?.OPENAI_API_KEY || "",
};
