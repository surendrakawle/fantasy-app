import mongoose from "mongoose";
import { UserTeam } from "../models/UserTeam.model";
import { Contest } from "../models/Contest.model";
import { Wallet } from "../models/Wallet.model";
import { Transaction } from "../models/Transaction.model";
import { Player } from "../models/Player.model";
import {CreateTeamPayload} from "../types/team";
export class TeamService {
  static async createTeam(
    userId: string,
    payload: CreateTeamPayload
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { contestId, matchId, players } = payload;

      /* -------------------- ONE TEAM PER CONTEST -------------------- */

      const existingTeam = await UserTeam.findOne({
        userId,
        contestId
      }).session(session);

      if (existingTeam) {
        throw new Error(
          "You have already created a team for this contest"
        );
      }

      /* -------------------- CONTEST VALIDATION -------------------- */

      const contest = await Contest.findOne({
        _id: contestId,
        matchId,
        contestType: "TEAM",
      }).session(session);

      if (!contest) {
        throw new Error("Invalid team contest");
      }

      /* -------------------- BASIC VALIDATIONS -------------------- */

      if (!players || players.length !== 11) {
        throw new Error("Team must contain exactly 11 players");
      }

      /* -------------------- DUPLICATE PLAYER CHECK -------------------- */

      const playerIds = players.map(p => p.playerId.toString());
      const uniquePlayers = new Set(playerIds);

      if (uniquePlayers.size !== 11) {
        throw new Error("Duplicate players are not allowed");
      }

      /* -------------------- CAPTAIN / VICE -------------------- */

      const captain = players.find(p => p.isCaptain);
      const viceCaptain = players.find(p => p.isViceCaptain);

      if (!captain || !viceCaptain) {
        throw new Error(
          "Exactly one Captain and one Vice Captain required"
        );
      }

      if (
        captain.playerId.toString() ===
        viceCaptain.playerId.toString()
      ) {
        throw new Error(
          "Captain and Vice Captain must be different"
        );
      }

      /* -------------------- FETCH PLAYER CREDITS FROM DB -------------------- */

      const dbPlayers = await Player.find({
        _id: { $in: playerIds },
        isActive: true
      }).session(session);
      if (dbPlayers.length !== 11) {
        throw new Error(
          "One or more selected players are invalid or inactive"
        );
      }

      /* -------------------- CREDIT CALCULATION -------------------- */

      const creditMap = new Map(
        dbPlayers.map(p => [p._id.toString(), p.credit])
      );

      const totalCredits = players.reduce(
        (sum, p) => sum + (creditMap.get(p.playerId.toString()) || 0),
        0
      );

      // if (totalCredits > 100) {
      //   throw new Error(
      //     "Total credit limit exceeded (max 100)"
      //   );
      // }

      /* -------------------- WALLET CHECK -------------------- */

      const wallet = await Wallet.findOne({ userId })
        .session(session);

      if (!wallet || wallet.balance < contest.entryFee) {
        throw new Error("Insufficient wallet balance");
      }

      /* -------------------- WALLET DEDUCTION -------------------- */

      wallet.balance -= contest.entryFee;
      await wallet.save({ session });

      await Transaction.create(
        [
          {
            userId,
            type: "ENTRY_FEE",
            contest: contest._id,
            amount: -contest.entryFee,
            reason: "Contest entry fee deduction",
          },
        ],
        { session }
      );

      /* -------------------- SAVE TEAM -------------------- */

      const team = await UserTeam.create(
        [
          {
            userId,
            contestId,
            matchId,
            totalCredits,
            players: players.map(p => ({
              playerId: p.playerId,
              isCaptain: p.isCaptain,
              isViceCaptain: p.isViceCaptain,
              multiplier: p.isCaptain
                ? 2
                : p.isViceCaptain
                ? 1.5
                : 1,
            })),
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return team[0];
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
}
