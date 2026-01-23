import { Contest } from "../models/Contest.model";
import { UserPrediction } from "../models/UserPrediction.model";
import { UserTeam } from "../models/UserTeam.model";
import { WalletService } from "./wallet.service";
import { SettlementStats } from "../types/settlement";

export class SettlementService {

  /* ================= PREVIEW STATS ================= */
  static async getStats(
    contestId: string
  ): Promise<SettlementStats> {
    const contest = await Contest.findById(contestId);
    if (!contest) {
      throw new Error("Contest not found");
    }

    /* ---------- PREDICTION CONTEST ---------- */
    if (contest.contestType === "PREDICTION") {
      const predictions =
        await UserPrediction.find({ contestId });

      const totalAmount = predictions.reduce(
        (s, p) => s + p.amount,
        0
      );

      const totalWin = predictions.reduce(
        (s, p) => s + (p.winAmount || 0),
        0
      );

      return {
        contestId,
        contestType: "PREDICTION",
        status: contest.status,
        totalEntries: predictions.length,
        totalAmount,
        totalWin,
        profit: totalAmount - totalWin
      };
    }

    /* ---------- TEAM CONTEST ---------- */
    const teams = await UserTeam.find({ contestId });
    const joinedUsers = teams.length;
    const entryFee = contest.entryFee || 0;
    const prizePool = contest.prizePool || 0;

    const totalAmount = joinedUsers * entryFee;

    return {
      contestId,
      contestType: "TEAM",
      status: contest.status,
      totalEntries: joinedUsers,
      totalAmount,
      joinedUsers,
      entryFee,
      prizePool,
      platformMargin: totalAmount - prizePool
    };
  }

  /* ================= PREDICTION SETTLEMENT ================= */
  static async settlePredictionContest(
    contestId: string
  ): Promise<SettlementStats> {
    const contest = await Contest.findById(contestId);
    if (!contest || contest.contestType !== "PREDICTION") {
      throw new Error("Invalid prediction contest");
    }

    const predictions =
      await UserPrediction.find({
        contestId,
        settled: false
      });

    let totalAmount = 0;
    let totalWin = 0;

    for (const p of predictions) {
      totalAmount += p.amount;

      if (p.status === "WON") {
        totalWin += p.winAmount;

        await WalletService.creditWallet(
          p.userId.toString(),
          p.winAmount,
          "Prediction win",
          "WIN"
        );
      }

      p.settled = true;
      await p.save();
    }

    contest.status = "COMPLETED";
    await contest.save();

    return {
      contestId,
      contestType: "PREDICTION",
      status: contest.status,
      totalEntries: predictions.length,
      totalAmount,
      totalWin,
      profit: totalAmount - totalWin
    };
  }

  /* ================= TEAM SETTLEMENT ================= */
  static async settleTeamContest(
    contestId: string
  ): Promise<SettlementStats> {
    const contest = await Contest.findById(contestId);
    if (!contest || contest.contestType !== "TEAM") {
      throw new Error("Invalid team contest");
    }

    /* 🔥 Assume ranking + wallet credit already done */
    contest.status = "COMPLETED";
    await contest.save();

    const teams = await UserTeam.find({ contestId });

    const totalAmount =
      teams.length * (contest.entryFee || 0);

    return {
      contestId,
      contestType: "TEAM",
      status: contest.status,
      totalEntries: teams.length,
      totalAmount,
      joinedUsers: teams.length,
      entryFee: contest.entryFee,
      prizePool: contest.prizePool,
      platformMargin:
        totalAmount - (contest.prizePool || 0)
    };
  }
}
