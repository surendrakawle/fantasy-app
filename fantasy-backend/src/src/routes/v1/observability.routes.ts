import { Router } from "express";
import { register } from "../../config/metrics";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "UP" });
});

router.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

export default router;
