import { Match } from "../models/Match.model";
import { Contest } from "../models/Contest.model";
import { Prediction } from "../models/Prediction.model";
import { resultQueue } from "../queues/result.queue";

export class AdminService {
  /* -------------------- CREATE MATCH -------------------- */
  static async createMatch(payload: any) {
    const { teamA, teamB, startTime, sport } = payload;

    if (!teamA || !teamB || !startTime) {
      throw new Error("teamA, teamB and startTime are required");
    }

    return Match.create({
      teamA,
      teamB,
      sport: sport || "CRICKET",
      startTime
    });
  }

  /* -------------------- CREATE CONTEST -------------------- */
  static async createContest(payload: any) {
    const {
      matchId,
      entryFee,
      prizePool,
      maxParticipants,
      lockTime,
      contestType
    } = payload;

    if (!matchId || !entryFee || !prizePool || !maxParticipants || !lockTime) {
      throw new Error("Missing required contest fields");
    }

    const matchExists = await Match.exists({ _id: matchId });
    if (!matchExists) {
      throw new Error("Match not found");
    }

    return Contest.create({
      match:matchId,
      entryFee,
      prizePool,
      maxParticipants,
      lockTime,
      contestType: contestType || "PREDICTION"
    });
  }

  /* -------------------- CREATE PREDICTION -------------------- */
  static async createPrediction(payload: any) {
    const { contestId, question, options, points, order } = payload;

    if (!contestId || !question || !options || options.length < 2) {
      throw new Error("Invalid prediction payload");
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      throw new Error("Contest not found");
    }

    if (contest.status !== "OPEN") {
      throw new Error("Predictions are locked for this contest");
    }

    return Prediction.create({
      contestId,
      question,
      options,
      points: points || 10,
      order
    });
  }

  /* -------------------- PUBLISH RESULT -------------------- */
  static async publishResult(contestId: string) {
    if (!contestId) {
      throw new Error("contestId is required");
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      throw new Error("Contest not found");
    }

    if (contest.status === "COMPLETED") {
      throw new Error("Result already published");
    }

    await resultQueue.add(
      "calculate-result",
      { contestId },
      {
        jobId: `result-${contestId}`,
        removeOnComplete: true,
        attempts: 3
      }
    );

    contest.status = "COMPLETED";
    await contest.save();

    return true;
  }
}
