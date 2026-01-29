import { Team } from "../models/Team.model";

export class TeamService {
  static async create(payload: any) {
    return Team.create(payload);
  }

  static async list(activeOnly = true) {
    return Team.find(
      activeOnly ? { isActive: true } : {}
    ).sort({ name: 1 });
  }

  static async getById(id: string) {
    const team = await Team.findById(id);
    if (!team) throw new Error("Team not found");
    return team;
  }

  static async update(id: string, payload: any) {
    const team = await Team.findByIdAndUpdate(
      id,
      payload,
      { new: true }
    );

    if (!team) throw new Error("Team not found");
    return team;
  }

  static async remove(id: string) {
    const team = await Team.findByIdAndDelete(id);
    if (!team) throw new Error("Team not found");
  }
}
