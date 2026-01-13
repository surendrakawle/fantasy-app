import { resultQueue } from "../queues/result.queue";
import { walletQueue } from "../queues/wallet.queue";
import { fraudQueue } from "../queues/fraud.queue";
import { notificationQueue } from "../queues/notification.queue";

export const QueueService = {
  addResultJob(contestId: string) {
    return resultQueue.add(
      "calculate-result",
      { contestId },
      { jobId: `result-${contestId}` }
    );
  },

  addWalletCreditJob(contestId: string) {
    return walletQueue.add(
      "credit-winners",
      { contestId },
      { jobId: `wallet-${contestId}` }
    );
  },

  addFraudCheck(data: any) {
    return fraudQueue.add("fraud-check", data);
  },

  addNotification(data: any) {
    return notificationQueue.add("notify", data);
  }
};
