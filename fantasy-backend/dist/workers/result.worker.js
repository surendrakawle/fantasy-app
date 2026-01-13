"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const queueRedis_1 = require("../config/queueRedis");
const resultCalculation_job_1 = require("../jobs/resultCalculation.job");
const wallet_queue_1 = require("../queues/wallet.queue");
new bullmq_1.Worker("result-queue", async (job) => {
    const { contestId } = job.data;
    console.log("🏁 Processing result for contest:", contestId);
    await (0, resultCalculation_job_1.calculateResults)(contestId);
    await wallet_queue_1.walletQueue.add("credit-winners", { contestId });
}, {
    connection: queueRedis_1.queueRedis,
    concurrency: 5
});
//Workers should ideally run as separate process.
