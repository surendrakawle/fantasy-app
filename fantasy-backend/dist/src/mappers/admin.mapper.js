"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrediction = exports.mapContest = exports.mapMatch = void 0;
const mapMatch = (match) => ({
    id: match._id,
    teamA: match.teamA,
    teamB: match.teamB,
    sport: match.sport,
    startTime: match.startTime
});
exports.mapMatch = mapMatch;
const mapContest = (contest) => ({
    id: contest._id,
    entryFee: contest.entryFee,
    prizePool: contest.prizePool,
    maxParticipants: contest.maxParticipants,
    lockTime: contest.lockTime,
    status: contest.status
});
exports.mapContest = mapContest;
const mapPrediction = (prediction) => ({
    id: prediction._id,
    question: prediction.question,
    options: prediction.options,
    points: prediction.points,
    order: prediction.order
});
exports.mapPrediction = mapPrediction;
