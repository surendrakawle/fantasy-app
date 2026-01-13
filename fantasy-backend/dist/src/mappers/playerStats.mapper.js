"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPlayerStats = void 0;
const mapPlayerStats = (stats) => ({
    id: stats._id,
    matchId: stats.matchId,
    playerId: stats.playerId,
    runs: stats.runs,
    wickets: stats.wickets,
    catches: stats.catches,
    createdAt: stats.createdAt
});
exports.mapPlayerStats = mapPlayerStats;
