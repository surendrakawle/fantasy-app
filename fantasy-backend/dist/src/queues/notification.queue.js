"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationQueue = exports.NOTIFICATION_QUEUE = void 0;
const bullmq_1 = require("bullmq");
const queueRedis_1 = require("../config/queueRedis");
exports.NOTIFICATION_QUEUE = "notification-queue";
exports.notificationQueue = new bullmq_1.Queue(exports.NOTIFICATION_QUEUE, { connection: queueRedis_1.queueRedis });
