import { Queue } from "bullmq";
import { redisOptions } from "../config/redis";

export const WALLET_QUEUE_NAME = "wallet-queue";

export const walletQueue = new Queue(WALLET_QUEUE_NAME, {
  connection: redisOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "fixed",
      delay: 3000
    },
    removeOnComplete: true
  }
});
