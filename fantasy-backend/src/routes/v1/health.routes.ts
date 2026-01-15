import { Router } from "express";
import redis from "../../config/redis";

const router = Router();

router.get("/redis", async (_req, res) => {
  try {
    const pong = await redis.ping();
    res.json({ redis: pong === "PONG" ? "UP" : "DOWN" });
  } catch {
    res.status(503).json({ redis: "DOWN" });
  }
});

export default router;
