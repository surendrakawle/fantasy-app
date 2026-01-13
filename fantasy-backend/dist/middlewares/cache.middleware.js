"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const cache = (ttlSeconds = 60) => async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    try {
        const cached = await redis_1.default.get(key);
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        const send = res.json.bind(res);
        res.json = (body) => {
            redis_1.default.setex(key, ttlSeconds, JSON.stringify(body)).catch(() => { });
            return send(body);
        };
    }
    catch {
        // Redis down → silently skip cache
    }
    next();
};
exports.cache = cache;
