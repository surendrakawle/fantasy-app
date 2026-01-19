import { Match } from "../models/Match.model";

export class MatchService {

  /* ---------- ADMIN ---------- */

  static async create(data: any) {
    return Match.create(data);
  }

  static async update(matchId: string, data: any) {
    const match = await Match.findByIdAndUpdate(
      matchId,
      data,
      { new: true }
    );

    if (!match) throw new Error("Match not found");
    return match;
  }

  static async delete(matchId: string) {
    const match = await Match.findByIdAndDelete(matchId);
    if (!match) throw new Error("Match not found");
    return match;
  }

  static async getById(matchId: string) {
    const match = await Match.findById(matchId);
    if (!match) throw new Error("Match not found");
    return match;
  }

  /* ---------- USER / PUBLIC ---------- */

  static async listUpcoming() {
    return Match.find({ status: "UPCOMING" }).sort({ startTime: 1 });
  }

  static async listAll() {
    return Match.find().sort({ createdAt: -1 });
  }
}
