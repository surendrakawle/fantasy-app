import { FraudFlag } from "../models/FraudFlag.model";

export async function calculateFraudScore(input: {
  userId: string;
  ipMismatch?: boolean;
  multipleAccounts?: boolean;
  fastWithdraw?: boolean;
}) {
  let score = 0;

  if (input.ipMismatch) score += 25;
  if (input.multipleAccounts) score += 40;
  if (input.fastWithdraw) score += 30;

  if (score >= 50) {
    await FraudFlag.create({
      userId: input.userId,
      reason: "Suspicious behavior detected",
      severity: score >= 70 ? "HIGH" : "MEDIUM"
    });
  }

  return score;
}
