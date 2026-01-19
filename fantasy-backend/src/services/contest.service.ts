import { Contest } from "../models/Contest.model";

export class ContestService {

  /* ---------- ADMIN ---------- */

  static async create(data: any) {
    // Validation for contest types
    if (data.contestType === "TEAM" && !data.entryFee) {
      throw new Error("Entry fee required for TEAM contest");
    }

    if (data.contestType === "PREDICTION") {
      if (!data.baseAmount || !data.multiplier) {
        throw new Error("Base amount & multiplier required for PREDICTION contest");
      }
    }

    return Contest.create(data);
  }

  static async update(contestId: string, data: any) {
    const contest = await Contest.findByIdAndUpdate(
      contestId,
      data,
      { new: true }
    );

    if (!contest) throw new Error("Contest not found");
    return contest;
  }

  static async delete(contestId: string) {
    const contest = await Contest.findByIdAndDelete(contestId);
    if (!contest) throw new Error("Contest not found");
    return contest;
  }

  static async listAll() {
    return Contest.find().sort({ createdAt: -1 });
  }

  /* ---------- USER / PUBLIC ---------- */

  static async listOpen() {
    return Contest.find({ status: "OPEN" }).sort({ lockTime: 1 });
  }

  static async listByMatch(matchId: string) {
    return Contest.find({
      matchId,
      status: "OPEN"
    }).sort({ createdAt: -1 });
  }

  static async getById(contestId: string) {
    const contest = await Contest.findById(contestId);
    if (!contest) throw new Error("Contest not found");
    return contest;
  }
}
