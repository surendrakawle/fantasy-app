import { Worker } from "bullmq";
import { queueRedis } from "../config/queueRedis";
import {notificationQueue} from "../queues/notification.queue"

new Worker(
  "notification-queue",
  async (job) => {
    const { userId, message } = job.data;

    // Replace with SMS / Push / Email provider
    console.log(`🔔 Notify ${userId}: ${message}`);
    await notificationQueue.add("notify", {
        userId,
        message: "🎉 You won ₹500!"
      });
      
  },
  {
    connection: queueRedis,
    concurrency: 5
  }
);
