import mongoose from "mongoose";
import { Contest } from "../models/Contest.model";
import { ContestParticipant } from "../models/ContestParticipant.model";
import { WalletService } from "./wallet.service";

export class ContestService {
  /* -------------------- LIST OPEN CONTESTS -------------------- */
  static async listOpenContests() {
    return Contest.find()
        .populate("match", "teamA teamB startTime status")
        .sort({ createdAt: -1 })
        .lean();
  }

  /* -------------------- JOIN CONTEST -------------------- */
  static async joinContest(userId: string, contestId: string) {
    if (!contestId) {
      throw new Error("contestId is required");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const contest = await Contest.findById(contestId).populate("match", "teamA teamB startTime status").session(session);

      if (!contest || contest.status !== "OPEN") {
        throw new Error("Contest not available");
      }

      const alreadyJoined = await ContestParticipant.findOne({
        contestId,
        userId
      }).session(session);

      if (alreadyJoined) {
        throw new Error("Already joined contest");
      }

      /* Debit wallet (atomic) */
      await WalletService.debitWallet(userId, contest.entryFee, `Contest ${contestId}`, session);

      await ContestParticipant.create(
        [{ contestId, userId }],
        { session }
      );

      contest.joinedCount += 1;

      if (contest.joinedCount >= contest.maxParticipants) {
        contest.status = "LOCKED";
      }

      await contest.save({ session });

      await session.commitTransaction();
      session.endSession();

      return contest;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
}
