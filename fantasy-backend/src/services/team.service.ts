import mongoose from "mongoose";
import { UserTeam } from "../models/UserTeam.model";
import type {
  CreateTeamPayload,
  TeamPlayer,
} from "../types/team";

export class TeamService {
  static async createTeam(
    payload: CreateTeamPayload
  ) {
    const { players } = payload;

    /* ---------- BASIC VALIDATIONS ---------- */

    if (!players || players.length !== 11) {
      throw new Error(
        "Team must contain exactly 11 players"
      );
    }

    /* ---------- CREDIT LIMIT ---------- */

    const totalCredits = players.reduce(
      (sum: number, p: TeamPlayer) =>
        sum + p.credit,
      0
    );

    if (totalCredits > 100) {
      throw new Error(
        "Total credit limit exceeded (max 100)"
      );
    }

    /* ---------- CAPTAIN / VICE ---------- */

    const captains = players.filter(
      (p) => p.isCaptain
    );
    const viceCaptains = players.filter(
      (p) => p.isViceCaptain
    );

    if (captains.length !== 1) {
      throw new Error(
        "Exactly one Captain is required"
      );
    }

    if (viceCaptains.length !== 1) {
      throw new Error(
        "Exactly one Vice Captain is required"
      );
    }

    if (
      captains[0].playerId.toString() ===
      viceCaptains[0].playerId.toString()
    ) {
      throw new Error(
        "Captain and Vice Captain must be different players"
      );
    }

    /* ---------- DUPLICATE PLAYER CHECK ---------- */

    const uniquePlayers = new Set(
      players.map((p) =>
        p.playerId.toString()
      )
    );

    if (uniquePlayers.size !== 11) {
      throw new Error(
        "Duplicate players are not allowed"
      );
    }

    /* ---------- SAVE TEAM ---------- */

    return UserTeam.create({
      ...payload,
      createdAt: new Date(),
    });
  }
}
