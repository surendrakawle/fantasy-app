"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Contest_model_1 = require("../models/Contest.model");
const ContestParticipant_model_1 = require("../models/ContestParticipant.model");
const wallet_service_1 = require("./wallet.service");
class ContestService {
    /* -------------------- LIST OPEN CONTESTS -------------------- */
    static async listOpenContests() {
        return Contest_model_1.Contest.find()
            .populate("match", "teamA teamB startTime status")
            .sort({ createdAt: -1 })
            .lean();
    }
    /* -------------------- JOIN CONTEST -------------------- */
    static async joinContest(userId, contestId) {
        if (!contestId) {
            throw new Error("contestId is required");
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const contest = await Contest_model_1.Contest.findById(contestId).populate("match", "teamA teamB startTime status").session(session);
            if (!contest || contest.status !== "OPEN") {
                throw new Error("Contest not available");
            }
            const alreadyJoined = await ContestParticipant_model_1.ContestParticipant.findOne({
                contestId,
                userId
            }).session(session);
            if (alreadyJoined) {
                throw new Error("Already joined contest");
            }
            /* Debit wallet (atomic) */
            await wallet_service_1.WalletService.debitWallet(userId, contest.entryFee, `Contest ${contestId}`, session);
            await ContestParticipant_model_1.ContestParticipant.create([{ contestId, userId }], { session });
            contest.joinedCount += 1;
            if (contest.joinedCount >= contest.maxParticipants) {
                contest.status = "LOCKED";
            }
            await contest.save({ session });
            await session.commitTransaction();
            session.endSession();
            return contest;
        }
        catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }
}
exports.ContestService = ContestService;
