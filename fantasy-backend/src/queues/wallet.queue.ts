import { Queue } from "bullmq";
import { queueRedis } from "../config/queueRedis";

export const WALLET_QUEUE = "wallet-queue";

export const walletQueue = new Queue(WALLET_QUEUE, {
  connection: queueRedis
});
