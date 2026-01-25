import { Types } from "mongoose";

export interface TeamPlayerInput {
  playerId: Types.ObjectId;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

export interface CreateTeamPayload {
  contestId: Types.ObjectId;
  matchId: Types.ObjectId;
  players: TeamPlayerInput[];
}
