"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyRank = exports.getLeaderboard = void 0;
const leaderboard_service_1 = require("../services/leaderboard.service");
const leaderboard_mapper_1 = require("../mappers/leaderboard.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const getLeaderboard = async (req, res) => {
    try {
        const { contestId } = req.params;
        const rawLeaderboard = await leaderboard_service_1.LeaderboardService.getTopUsers(contestId, 10);
        return (0, apiResponse_1.success)(res, (0, leaderboard_mapper_1.mapLeaderboard)(rawLeaderboard), "Leaderboard fetched");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.getLeaderboard = getLeaderboard;
const getMyRank = async (req, res) => {
    try {
        const { contestId } = req.params;
        const userId = req.user.userId;
        const rank = await leaderboard_service_1.LeaderboardService.getUserRank(contestId, userId);
        return (0, apiResponse_1.success)(res, { rank }, "User rank fetched");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.getMyRank = getMyRank;
