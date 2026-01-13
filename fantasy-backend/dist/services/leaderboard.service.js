"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardKey = leaderboardKey;
exports.addScore = addScore;
exports.getTopUsers = getTopUsers;
exports.getUserRank = getUserRank;
const redis_1 = __importDefault(require("../config/redis"));
function leaderboardKey(contestId) {
    return `leaderboard:${contestId}`;
}
async function addScore(contestId, userId, score) {
    await redis_1.default.zadd(leaderboardKey(contestId), score, userId);
}
async function getTopUsers(contestId, limit = 10) {
    return redis_1.default.zrevrange(leaderboardKey(contestId), 0, limit - 1, "WITHSCORES");
}
async function getUserRank(contestId, userId) {
    const rank = await redis_1.default.zrevrank(leaderboardKey(contestId), userId);
    return rank !== null ? rank + 1 : null;
}
