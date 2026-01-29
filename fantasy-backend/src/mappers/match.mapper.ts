import { IMatch } from "../models/Match.model";

export const mapMatch = (match: IMatch) => ({
  id: match._id.toString(),
  sport: match.sport,
  league: match.leagueId ? {
    id: match.leagueId._id,
    name: match.leagueId.name,
    shortName: match.leagueId.shortName,
  }
: null,
  name: match.name,
  venue: match.venue,
  matchType: match.matchType,
  result: match.result,
  teamA: match.teamA ? {
    name: match.teamA.name,
    logo: match.teamA.logoBase64,
    code: match.teamA.code
  }: null,
  teamB: match.teamB ? {
    name: match.teamB.name,
    logo: match.teamB.logoBase64,
    code: match.teamB.code
  }: null,
  startTime: match.startTime,
  status: match.status,
  cricketDataId: match.cricketDataId,
  resultProcessed: match.resultProcessed,
  createdAt: match.createdAt
});

