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

  static async getByTeam(teamInput: string) {
    // 1. Convert "ENG,IND" into ["ENG", "IND"] and clean whitespace
    const teamCodes = teamInput.split(',').map(t => t.trim());
  
    // 2. Use $in to find players matching any of those codes
    const players = await Player.find({ 
      team: { $in: teamCodes } 
    })
    .select('name team role credit') // Only get the fields you need
    .lean();
  
    if (!players || players.length === 0) {
      throw new Error("No players found for the specified teams");
    }
  
    return players;
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
