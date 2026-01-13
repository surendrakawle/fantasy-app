"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redis_1 = __importDefault(require("../config/redis"));
const router = (0, express_1.Router)();
router.get("/redis", async (_req, res) => {
    try {
        const pong = await redis_1.default.ping();
        res.json({ redis: pong === "PONG" ? "UP" : "DOWN" });
    }
    catch {
        res.status(503).json({ redis: "DOWN" });
    }
});
exports.default = router;
