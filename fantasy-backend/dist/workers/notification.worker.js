"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const queueRedis_1 = require("../config/queueRedis");
const notification_queue_1 = require("../queues/notification.queue");
new bullmq_1.Worker("notification-queue", async (job) => {
    const { userId, message } = job.data;
    // Replace with SMS / Push / Email provider
    console.log(`🔔 Notify ${userId}: ${message}`);
    await notification_queue_1.notificationQueue.add("notify", {
        userId,
        message: "🎉 You won ₹500!"
    });
}, {
    connection: queueRedis_1.queueRedis,
    concurrency: 5
});
