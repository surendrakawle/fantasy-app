"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserTeam = void 0;
const mapUserTeam = (team) => ({
    id: team._id,
    contestId: team.contestId,
    matchId: team.matchId,
    players: team.players.map((p) => ({
        playerId: p.playerId,
        isCaptain: p.isCaptain,
        isViceCaptain: p.isViceCaptain
    })),
    totalCredits: team.totalCredits,
    createdAt: team.createdAt
});
exports.mapUserTeam = mapUserTeam;
