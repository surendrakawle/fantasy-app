import { Worker } from "bullmq";
import { redisOptions } from "../config/redis";
import { WALLET_QUEUE_NAME } from "../queues/wallet.queue";
import { WalletService } from "../services/wallet.service";

const worker = new Worker(
  WALLET_QUEUE_NAME,
  async (job) => {
    const { userId, amount } = job.data;

    console.log(`💰 Crediting wallet: ${userId} +${amount}`);

    // await WalletService.credit(userId, amount);
  },
  {
    connection: redisOptions,
    concurrency: 5
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Wallet job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Wallet job failed: ${job?.id}`, err);
});
