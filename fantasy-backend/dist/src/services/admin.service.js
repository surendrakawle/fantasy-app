"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const Match_model_1 = require("../models/Match.model");
const Contest_model_1 = require("../models/Contest.model");
const Prediction_model_1 = require("../models/Prediction.model");
const result_queue_1 = require("../queues/result.queue");
class AdminService {
    /* -------------------- CREATE MATCH -------------------- */
    static async createMatch(payload) {
        const { teamA, teamB, startTime, sport } = payload;
        if (!teamA || !teamB || !startTime) {
            throw new Error("teamA, teamB and startTime are required");
        }
        return Match_model_1.Match.create({
            teamA,
            teamB,
            sport: sport || "CRICKET",
            startTime
        });
    }
    /* -------------------- CREATE CONTEST -------------------- */
    static async createContest(payload) {
        const { matchId, entryFee, prizePool, maxParticipants, lockTime, contestType } = payload;
        if (!matchId || !entryFee || !prizePool || !maxParticipants || !lockTime) {
            throw new Error("Missing required contest fields");
        }
        const matchExists = await Match_model_1.Match.exists({ _id: matchId });
        if (!matchExists) {
            throw new Error("Match not found");
        }
        return Contest_model_1.Contest.create({
            match: matchId,
            entryFee,
            prizePool,
            maxParticipants,
            lockTime,
            contestType: contestType || "PREDICTION"
        });
    }
    /* -------------------- CREATE PREDICTION -------------------- */
    static async createPrediction(payload) {
        const { contestId, question, options, points, order } = payload;
        if (!contestId || !question || !options || options.length < 2) {
            throw new Error("Invalid prediction payload");
        }
        const contest = await Contest_model_1.Contest.findById(contestId);
        if (!contest) {
            throw new Error("Contest not found");
        }
        if (contest.status !== "OPEN") {
            throw new Error("Predictions are locked for this contest");
        }
        return Prediction_model_1.Prediction.create({
            contestId,
            question,
            options,
            points: points || 10,
            order
        });
    }
    /* -------------------- PUBLISH RESULT -------------------- */
    static async publishResult(contestId) {
        if (!contestId) {
            throw new Error("contestId is required");
        }
        const contest = await Contest_model_1.Contest.findById(contestId);
        if (!contest) {
            throw new Error("Contest not found");
        }
        if (contest.status === "COMPLETED") {
            throw new Error("Result already published");
        }
        await result_queue_1.resultQueue.add("calculate-result", { contestId }, {
            jobId: `result-${contestId}`,
            removeOnComplete: true,
            attempts: 3
        });
        contest.status = "COMPLETED";
        await contest.save();
        return true;
    }
}
exports.AdminService = AdminService;
