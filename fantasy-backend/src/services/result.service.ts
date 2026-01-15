import { Contest } from "../models/Contest.model";
import { UserTeam } from "../models/UserTeam.model";
import { PlayerStats } from "../models/PlayerStats.model";
import { PointsService } from "./points.service";
import { LeaderboardService } from "./leaderboard.service";

export class ResultService {
  /**
   * Publish result for MATCH type contest
   * Idempotent & safe
   */
  static async publishMatchResult(contestId: string) {
    /* -------------------- Validate contest -------------------- */
    const contest = await Contest.findById(contestId);

    if (!contest) {
      throw new Error("Contest not found");
    }

    if (contest.status === "COMPLETED") {
      // Idempotency: already processed
      return;
    }

    if (contest.contestType !== "MATCH") {
      throw new Error("Invalid contest type");
    }

    /* -------------------- Load user teams -------------------- */
    const teams = await UserTeam.find({ contestId }).lean();

    if (!teams.length) {
      throw new Error("No teams found for contest");
    }

    /* -------------------- Load player stats (MATCH ONLY) -------------------- */
    const stats = await PlayerStats.find({
      matchId: contest.matchId
    }).lean();

    /* -------------------- Build player points map -------------------- */
    const playerPointsMap: Record<string, number> = {};

    for (const stat of stats) {
      playerPointsMap[stat.playerId.toString()] =
        PointsService.calculate(stat);
    }

    /* -------------------- Score each user team -------------------- */
    for (const team of teams) {
      let totalScore = 0;

      for (const p of team.players) {
        let pts =
          playerPointsMap[p.playerId.toString()] || 0;

        if (p.isCaptain) pts *= 2;
        if (p.isViceCaptain) pts *= 1.5;

        totalScore += pts;
      }

      /* -------------------- Update leaderboard (Redis) -------------------- */
      await LeaderboardService.addScore(
        contestId,
        team.userId.toString(),
        totalScore
      );
    }

    /* -------------------- Mark contest completed -------------------- */
    contest.status = "COMPLETED";
    contest.completedAt = new Date();
    await contest.save();
  }
}
