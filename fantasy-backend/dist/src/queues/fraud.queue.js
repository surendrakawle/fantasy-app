"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fraudQueue = exports.FRAUD_QUEUE = void 0;
const bullmq_1 = require("bullmq");
const queueRedis_1 = require("../config/queueRedis");
exports.FRAUD_QUEUE = "fraud-queue";
exports.fraudQueue = new bullmq_1.Queue(exports.FRAUD_QUEUE, {
    connection: queueRedis_1.queueRedis
});
