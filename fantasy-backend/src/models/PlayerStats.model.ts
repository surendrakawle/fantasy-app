import { Schema, model, Types } from "mongoose";

const PlayerStatsSchema = new Schema(
  {
    matchId: {
      type: Types.ObjectId,
      ref: "Match",
      required: true,
      index: true
    },
    playerId: {
      type: Types.ObjectId,
      ref: "Player",
      required: true,
      index: true
    },

    /* -------------------- BATTING -------------------- */
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    isOut: { type: Boolean, default: false },

    /* -------------------- BOWLING -------------------- */
    overs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },

    /* -------------------- FIELDING -------------------- */
    catches: { type: Number, default: 0 },
    runOuts: { type: Number, default: 0 },
    stumpings: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

/* -------------------- INDEXES -------------------- */
// One stat record per player per match
PlayerStatsSchema.index(
  { matchId: 1, playerId: 1 },
  { unique: true }
);

export const PlayerStats = model(
  "PlayerStats",
  PlayerStatsSchema
);
