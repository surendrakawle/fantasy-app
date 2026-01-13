"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapContest = void 0;
const mapContest = (contest) => ({
    id: contest._id,
    entryFee: contest.entryFee,
    prizePool: contest.prizePool,
    maxParticipants: contest.maxParticipants,
    joinedCount: contest.joinedCount,
    status: contest.status,
    contestType: contest.contestType,
    lockTime: contest.lockTime,
    match: contest.match && {
        id: contest.match._id,
        teamA: contest.match.teamA,
        teamB: contest.match.teamB,
        sport: contest.match.sport,
        startTime: contest.match.startTime,
        status: contest.match.status,
    },
    createdAt: contest.createdAt
});
exports.mapContest = mapContest;
