"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const leaderboard_service_1 = require("../services/leaderboard.service");
const getLeaderboard = async (req, res) => {
    const { contestId } = req.params;
    const leaderboard = await (0, leaderboard_service_1.getTopUsers)(contestId, 10);
    res.json(leaderboard);
};
exports.getLeaderboard = getLeaderboard;
