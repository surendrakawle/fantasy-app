import { IMatch } from "../models/Match.model";

export const mapMatch = (match: IMatch) => ({
  id: match._id,
  sport: match.sport,
  teamA: match.teamA,
  teamB: match.teamB,
  startTime: match.startTime,
  status: match.status,
  resultProcessed: match.resultProcessed,
  createdAt: match.createdAt
});
