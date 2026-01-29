import mongoose, { Schema, Document, Types } from "mongoose";

export type MatchStatus =
  | "UPCOMING"
  | "LIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface IMatch extends Document {
  sport: "CRICKET";

  leagueId: Types.ObjectId;   // IPL, WC, etc.

  name: string;              // India vs Pakistan
  venue: string;
  matchType: string;         // T20 / ODI / TEST
  result?: string;

  teamA: Types.ObjectId;     // Team (India)
  teamB: Types.ObjectId;     // Team (Pakistan)

  startTime: Date;
  status: MatchStatus;

  cricketDataId?: string;    // External API ID
  resultProcessed: boolean;

  createdAt: Date;
  updatedAt: Date;
}


const matchSchema = new Schema<IMatch>(
  {
    sport: {
      type: String,
      enum: ["CRICKET"],
      default: "CRICKET"
    },

    /* ---------- LEAGUE ---------- */
    leagueId: {
      type: Schema.Types.ObjectId,
      ref: "League",
      required: true,
      index: true
    },
    

    /* ---------- BASIC INFO ---------- */
    name: {
      type: String,
      trim: true,
      default: ""
    },

    venue: {
      type: String,
      trim: true,
      default: ""
    },

    matchType: {
      type: String,
      trim: true,
      default: "" // T20 / ODI
    },

    result: {
      type: String,
      default: ""
    },

    /* ---------- TEAMS ---------- */
    teamA: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true
    },

    teamB: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true
    },

    /* ---------- TIMING ---------- */
    startTime: {
      type: Date,
      required: true,
      index: true
    },

    /* ---------- STATUS ---------- */
    status: {
      type: String,
      enum: ["UPCOMING", "LIVE", "COMPLETED", "CANCELLED"],
      default: "UPCOMING",
      index: true
    },

    /* ---------- EXTERNAL API ---------- */
    cricketDataId: {
      type: String,
      index: true
    },

    /* ---------- RESULT ---------- */
    resultProcessed: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true
  }
);
matchSchema.index({ leagueId: 1, startTime: 1 });
matchSchema.index({ teamA: 1, teamB: 1 });
matchSchema.index({ status: 1, startTime: 1 });
export const Match = mongoose.model<IMatch>(
  "Match",
  matchSchema
);
