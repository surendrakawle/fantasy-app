"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultQueue = exports.RESULT_QUEUE_NAME = void 0;
const bullmq_1 = require("bullmq");
const queueRedis_1 = require("../config/queueRedis");
exports.RESULT_QUEUE_NAME = "result-queue";
exports.resultQueue = new bullmq_1.Queue(exports.RESULT_QUEUE_NAME, {
    connection: queueRedis_1.queueRedis
});
