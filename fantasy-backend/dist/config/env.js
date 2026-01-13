"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envFile = `.env.${process.env.NODE_ENV || "ict"}`;
dotenv_1.default.config({ path: envFile });
exports.env = {
    // App
    NODE_ENV: process.env.NODE_ENV || "ict",
    PORT: process.env.PORT || 4000,
    // Database
    MONGO_URI: process.env.MONGO_URI,
    // Auth
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // Redis
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
    REDIS_DB: Number(process.env.REDIS_DB) || 0,
};
