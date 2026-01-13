import { Queue } from "bullmq";
import { queueRedis } from "../config/queueRedis";

export const NOTIFICATION_QUEUE = "notification-queue";

export const notificationQueue = new Queue(
  NOTIFICATION_QUEUE,
  { connection: queueRedis }
);
