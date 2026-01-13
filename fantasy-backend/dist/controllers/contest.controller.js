"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinContest = exports.listContests = void 0;
const Contest_model_1 = require("../models/Contest.model");
const ContestParticipant_model_1 = require("../models/ContestParticipant.model");
const wallet_service_1 = require("../services/wallet.service");
const listContests = async (_req, res) => {
    const contests = await Contest_model_1.Contest.find({ status: "OPEN" });
    res.json(contests);
};
exports.listContests = listContests;
const joinContest = async (req, res) => {
    const contestId = req.params.id;
    const userId = req.user.userId;
    const contest = await Contest_model_1.Contest.findById(contestId);
    if (!contest || contest.status !== "OPEN") {
        return res.status(400).json({ message: "Contest not available" });
    }
    const exists = await ContestParticipant_model_1.ContestParticipant.findOne({ contestId, userId });
    if (exists) {
        return res.status(409).json({ message: "Already joined" });
    }
    await (0, wallet_service_1.debitWallet)(userId, contest.entryFee, `Contest ${contestId}`);
    await ContestParticipant_model_1.ContestParticipant.create({ contestId, userId });
    contest.joinedCount += 1;
    if (contest.joinedCount >= contest.maxParticipants) {
        contest.status = "LOCKED";
    }
    await contest.save();
    res.json({ message: "Contest joined successfully" });
};
exports.joinContest = joinContest;
