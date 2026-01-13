"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const result_queue_1 = require("../queues/result.queue");
const wallet_queue_1 = require("../queues/wallet.queue");
const fraud_queue_1 = require("../queues/fraud.queue");
const notification_queue_1 = require("../queues/notification.queue");
exports.QueueService = {
    addResultJob(contestId) {
        return result_queue_1.resultQueue.add("calculate-result", { contestId }, { jobId: `result-${contestId}` });
    },
    addWalletCreditJob(contestId) {
        return wallet_queue_1.walletQueue.add("credit-winners", { contestId }, { jobId: `wallet-${contestId}` });
    },
    addFraudCheck(data) {
        return fraud_queue_1.fraudQueue.add("fraud-check", data);
    },
    addNotification(data) {
        return notification_queue_1.notificationQueue.add("notify", data);
    }
};
