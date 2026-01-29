export type MatchStatus =
  | "UPCOMING"
  | "LIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface CreateMatchPayload {
  leagueId: string;
  name?: string;
  venue?: string;
  matchType?: string;
  teamA: string;
  teamB: string;
  startTime: string;
  cricketDataId?: string;
}

export interface UpdateMatchPayload {
  name?: string;
  venue?: string;
  matchType?: string;
  startTime?: string;
  status?: MatchStatus;
  result?: string;
  resultProcessed?: boolean;
}
