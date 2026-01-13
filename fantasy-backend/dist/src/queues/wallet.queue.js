"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletQueue = exports.WALLET_QUEUE = void 0;
const bullmq_1 = require("bullmq");
const queueRedis_1 = require("../config/queueRedis");
exports.WALLET_QUEUE = "wallet-queue";
exports.walletQueue = new bullmq_1.Queue(exports.WALLET_QUEUE, {
    connection: queueRedis_1.queueRedis
});
