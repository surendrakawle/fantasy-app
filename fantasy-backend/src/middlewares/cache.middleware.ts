import { Request, Response, NextFunction } from "express";
import redis from "../config/redis";

export const cache =
  (ttlSeconds = 60) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redis.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const send = res.json.bind(res);
      res.json = (body: any) => {
        redis.setex(key, ttlSeconds, JSON.stringify(body)).catch(() => {});
        return send(body);
      };
    } catch {
      // Redis down → silently skip cache
    }

    next();
  };
