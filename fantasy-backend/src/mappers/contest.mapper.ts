import { IContest } from "../models/Contest.model";

export const mapContest = (c: IContest) => ({
  id: c._id,
  matchId: c.matchId,
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
