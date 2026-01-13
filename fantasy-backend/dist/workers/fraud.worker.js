"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const queueRedis_1 = require("../config/queueRedis");
const fraudScore_service_1 = require("../services/fraudScore.service");
new bullmq_1.Worker("fraud-queue", async (job) => {
    await (0, fraudScore_service_1.calculateFraudScore)(job.data);
}, {
    connection: queueRedis_1.queueRedis,
    concurrency: 3
});
