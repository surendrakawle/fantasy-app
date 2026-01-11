import { Queue } from "bullmq";
import { queueRedis } from "../config/queueRedis";

export const FRAUD_QUEUE = "fraud-queue";

export const fraudQueue = new Queue(FRAUD_QUEUE, {
  connection: queueRedis
});
