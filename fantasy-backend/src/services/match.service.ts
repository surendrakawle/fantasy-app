
import { Match } from "../models/Match.model";
import {
  CreateMatchPayload,
  UpdateMatchPayload
} from "../types/match";

export class MatchService {
  static async create(payload: CreateMatchPayload) {
    if (payload.teamA === payload.teamB) {
      throw new Error("Team A and Team B must be different");
    }

    return Match.create({
      ...payload,
    });
  }
  
  static async listUpcoming() {
    return Match.find({ status: "UPCOMING" }).sort({ startTime: 1 });
  }
  
  static async listAll(filters: any = {}) {
    return Match.find(filters)
      .populate("teamA teamB leagueId")
      .sort({ startTime: 1 });
  }

  static async getById(id: string) {
    const match = await Match.findById(id)
      .populate("teamA teamB leagueId");

    if (!match) {
      throw new Error("Match not found");
    }
    return match;
  }

  static async update(
    id: string,
    payload: UpdateMatchPayload
  ) {
    const match = await Match.findByIdAndUpdate(
      id,
      payload,
      { new: true }
    );

    if (!match) {
      throw new Error("Match not found");
    }
    return match;
  }

  static async remove(id: string) {
    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      throw new Error("Match not found");
    }
  }
}

