import { League } from "../models/League.model";

export class LeagueService {
  static async create(payload: {
    name: string;
    shortName: string;
    season: string;
    image: string;
  }) {
    return League.create(payload);
  }

  static async listAll(includeInactive = false) {
    return League.find(
      includeInactive ? {} : { isActive: true }
    ).sort({ createdAt: -1 });
  }

  static async update(
    id: string,
    payload: any
  ) {
    const league = await League.findByIdAndUpdate(
      id,
      payload,
      { new: true }
    );

    if (!league) {
      throw new Error("League not found");
    }

    return league;
  }

  static async delete(id: string) {
    const league = await League.findByIdAndDelete(id);
    if (!league) {
      throw new Error("League not found");
    }
  }
}
