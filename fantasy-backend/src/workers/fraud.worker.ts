import { Worker } from "bullmq";
import { queueRedis } from "../config/queueRedis";
import { calculateFraudScore } from "../services/fraudScore.service";

new Worker(
  "fraud-queue",
  async (job) => {
    await calculateFraudScore(job.data);
  },
  {
    connection: queueRedis,
    concurrency: 3
  }
);
