import { Queue } from "bullmq";
import { queueRedis } from "../config/queueRedis";

export const RESULT_QUEUE_NAME = "result-queue";

export const resultQueue = new Queue(RESULT_QUEUE_NAME, {
  connection: queueRedis
});
