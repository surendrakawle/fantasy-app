import { Queue } from "bullmq";
import { redisOptions } from "../config/redis";

export const RESULT_QUEUE_NAME = "result-queue";

export const resultQueue = new Queue(RESULT_QUEUE_NAME, {
  connection: redisOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000
    },
    removeOnComplete: true,
    removeOnFail: false
  }
});
