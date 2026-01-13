"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueRedis = void 0;
const env_1 = require("./env");
exports.queueRedis = {
    host: env_1.env.REDIS_HOST,
    port: env_1.env.REDIS_PORT,
    password: env_1.env.REDIS_PASSWORD,
    db: env_1.env.REDIS_DB
};
