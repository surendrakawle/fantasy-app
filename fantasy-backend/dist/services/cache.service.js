"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = setCache;
exports.getCache = getCache;
const redis_1 = __importDefault(require("../config/redis"));
async function setCache(key, value, ttl = 60) {
    await redis_1.default.setex(key, ttl, JSON.stringify(value));
}
async function getCache(key) {
    const data = await redis_1.default.get(key);
    return data ? JSON.parse(data) : null;
}
