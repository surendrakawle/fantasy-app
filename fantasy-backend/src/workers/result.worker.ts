import { Worker } from "bullmq";
import { queueRedis } from "../config/queueRedis";
import { calculateResults } from "../jobs/resultCalculation.job";
import { walletQueue } from "../queues/wallet.queue";



new Worker(
  "result-queue",
  async (job) => {
    const { contestId } = job.data;

    console.log("🏁 Processing result for contest:", contestId);

    await calculateResults(contestId);
    await walletQueue.add("credit-winners", { contestId });
  },
  {
    connection: queueRedis,
    concurrency: 5
  }
);
//Workers should ideally run as separate process.
