import { Schema, model, Types } from "mongoose";

const UserTeamPlayerSchema = new Schema(
  {
    playerId: {
      type: Types.ObjectId,
      ref: "Player",
      required: true
    },
    isCaptain: {
      type: Boolean,
      default: false
    },
    isViceCaptain: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const UserTeamSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    contestId: {
      type: Types.ObjectId,
      ref: "Contest",
      required: true,
      index: true
    },
    matchId: {
      type: Types.ObjectId,
      ref: "Match",
      required: true,
      index: true
    },
    players: {
      type: [UserTeamPlayerSchema],
      validate: {
        validator: (v: any[]) => v.length === 11,
        message: "A team must have exactly 11 players"
      }
    },
    totalCredits: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

/* -------------------- INDEXES -------------------- */
// Prevent multiple teams per user per contest
UserTeamSchema.index(
  { userId: 1, contestId: 1 },
  { unique: true }
);

export const UserTeam = model("UserTeam", UserTeamSchema);
