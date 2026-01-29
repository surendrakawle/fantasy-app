import { IContest } from "../models/Contest.model";

export const mapContest = (c: IContest) => ({
  id: c._id,
  match: c.matchId ? {
    id: c.matchId._id,
    teamA: c.matchId.teamA,
    teamB: c.matchId.teamB
  }:null,
  contestType: c.contestType,

  entryFee: c.entryFee,
  baseAmount: c.baseAmount,
  multiplier: c.multiplier,

  prizePool: c.prizePool,
  maxParticipants: c.maxParticipants,
  joinedCount: c.joinedCount,
  lockTime: c.lockTime,
  status: c.status,
  createdAt: c.createdAt
});
