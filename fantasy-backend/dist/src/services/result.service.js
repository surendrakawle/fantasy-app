"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultService = void 0;
const Contest_model_1 = require("../models/Contest.model");
const UserTeam_model_1 = require("../models/UserTeam.model");
const PlayerStats_model_1 = require("../models/PlayerStats.model");
const points_service_1 = require("./points.service");
const leaderboard_service_1 = require("./leaderboard.service");
class ResultService {
    /**
     * Publish result for MATCH type contest
     * Idempotent & safe
     */
    static async publishMatchResult(contestId) {
        /* -------------------- Validate contest -------------------- */
        const contest = await Contest_model_1.Contest.findById(contestId);
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
        const teams = await UserTeam_model_1.UserTeam.find({ contestId }).lean();
        if (!teams.length) {
            throw new Error("No teams found for contest");
        }
        /* -------------------- Load player stats (MATCH ONLY) -------------------- */
        const stats = await PlayerStats_model_1.PlayerStats.find({
            matchId: contest.matchId
        }).lean();
        /* -------------------- Build player points map -------------------- */
        const playerPointsMap = {};
        for (const stat of stats) {
            playerPointsMap[stat.playerId.toString()] =
                points_service_1.PointsService.calculate(stat);
        }
        /* -------------------- Score each user team -------------------- */
        for (const team of teams) {
            let totalScore = 0;
            for (const p of team.players) {
                let pts = playerPointsMap[p.playerId.toString()] || 0;
                if (p.isCaptain)
                    pts *= 2;
                if (p.isViceCaptain)
                    pts *= 1.5;
                totalScore += pts;
            }
            /* -------------------- Update leaderboard (Redis) -------------------- */
            await leaderboard_service_1.LeaderboardService.addScore(contestId, team.userId.toString(), totalScore);
        }
        /* -------------------- Mark contest completed -------------------- */
        contest.status = "COMPLETED";
        contest.completedAt = new Date();
        await contest.save();
    }
}
exports.ResultService = ResultService;
