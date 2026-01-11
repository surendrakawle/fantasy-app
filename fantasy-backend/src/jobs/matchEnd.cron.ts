import cron from "node-cron";
import { Match } from "../models/Match.model";
import { resultQueue } from "../queues/result.queue";

cron.schedule("*/5 * * * *", async () => {
  const matches = await Match.find({
    status: "COMPLETED",
    resultProcessed: false
  });

  for (const match of matches) {
    await resultQueue.add(
      "calculate-result",
      { contestId: match._id },
      { jobId: `result-${match._id}` } // idempotent
    );

    match.resultProcessed = true;
    await match.save();
  }
});
