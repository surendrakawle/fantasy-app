"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const leaderboardKey = (contestId) => `leaderboard:${contestId}`;
class LeaderboardService {
    /* -------------------- ADD / UPDATE SCORE -------------------- */
    static async addScore(contestId, userId, score) {
        if (!contestId || !userId) {
            throw new Error("Invalid leaderboard params");
        }
        await redis_1.default.zadd(leaderboardKey(contestId), score, userId);
    }
    /* -------------------- GET TOP USERS -------------------- */
    static async getTopUsers(contestId, limit = 10) {
        if (!contestId) {
            throw new Error("contestId is required");
        }
        const raw = await redis_1.default.zrevrange(leaderboardKey(contestId), 0, limit - 1, "WITHSCORES");
        return raw;
    }
    /* -------------------- GET USER RANK -------------------- */
    static async getUserRank(contestId, userId) {
        const rank = await redis_1.default.zrevrank(leaderboardKey(contestId), userId);
        return rank !== null ? rank + 1 : null;
    }
}
exports.LeaderboardService = LeaderboardService;
