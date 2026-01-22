import mongoose from "mongoose";

export interface TeamPlayer {
  playerId: mongoose.Types.ObjectId;
  credit: number;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

export interface CreateTeamPayload {
  userId: mongoose.Types.ObjectId;
  contestId: mongoose.Types.ObjectId;
  matchId: mongoose.Types.ObjectId;
  players: TeamPlayer[];
}
