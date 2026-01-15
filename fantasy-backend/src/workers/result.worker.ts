import { Worker } from "bullmq";
import { redisOptions } from "../config/redis";
import { RESULT_QUEUE_NAME } from "../queues/result.queue";
import { ResultService } from "../services/result.service";

const worker = new Worker(
  RESULT_QUEUE_NAME,
  async (job) => {
    const { contestId } = job.data;

    console.log(`🏁 Calculating result for contest ${contestId}`);

    await ResultService.publishMatchResult(contestId);
  },
  {
    connection: redisOptions,
    concurrency: 2
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Result job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Result job failed: ${job?.id}`, err);
});
