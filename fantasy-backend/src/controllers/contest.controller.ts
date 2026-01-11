import { Request, Response } from "express";
import { Contest } from "../models/Contest.model";
import { ContestParticipant } from "../models/ContestParticipant.model";
import { debitWallet } from "../services/wallet.service";

export const listContests = async (_req: Request, res: Response) => {
  const contests = await Contest.find({ status: "OPEN" });
  res.json(contests);
};

export const joinContest = async (req: any, res: Response) => {
  const contestId = req.params.id;
  const userId = req.user.userId;

  const contest = await Contest.findById(contestId);
  if (!contest || contest.status !== "OPEN") {
    return res.status(400).json({ message: "Contest not available" });
  }

  const exists = await ContestParticipant.findOne({ contestId, userId });
  if (exists) {
    return res.status(409).json({ message: "Already joined" });
  }

  await debitWallet(userId, contest.entryFee, `Contest ${contestId}`);

  await ContestParticipant.create({ contestId, userId });

  contest.joinedCount += 1;
  if (contest.joinedCount >= contest.maxParticipants) {
    contest.status = "LOCKED";
  }
  await contest.save();

  res.json({ message: "Contest joined successfully" });
};
