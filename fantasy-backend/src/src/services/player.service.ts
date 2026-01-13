import { Player } from "../models/Player.model";

export class PlayerService {
  static async create(data: any) {
    return Player.create(data);
  }

  static async list(filters: any = {}) {
    return Player.find(
      { isActive: true, ...filters },
      null,
      { sort: { name: 1 } }
    ).lean();
  }

  static async getById(playerId: string) {
    const player = await Player.findById(playerId).lean();
    if (!player) {
      throw new Error("Player not found");
    }
    return player;
  }

  static async update(playerId: string, data: any) {
    const updated = await Player.findByIdAndUpdate(
      playerId,
      data,
      { new: true }
    );

    if (!updated) {
      throw new Error("Player not found");
    }

    return updated;
  }

  static async deactivate(playerId: string) {
    const player = await Player.findByIdAndUpdate(
      playerId,
      { isActive: false },
      { new: true }
    );

    if (!player) {
      throw new Error("Player not found");
    }

    return player;
  }
}
