"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTeam = void 0;
const mongoose_1 = require("mongoose");
const UserTeamPlayerSchema = new mongoose_1.Schema({
    playerId: {
        type: mongoose_1.Types.ObjectId,
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
}, { _id: false });
const UserTeamSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    contestId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Contest",
        required: true,
        index: true
    },
    matchId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Match",
        required: true,
        index: true
    },
    players: {
        type: [UserTeamPlayerSchema],
        validate: {
            validator: (v) => v.length === 11,
            message: "A team must have exactly 11 players"
        }
    },
    totalCredits: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
/* -------------------- INDEXES -------------------- */
// Prevent multiple teams per user per contest
UserTeamSchema.index({ userId: 1, contestId: 1 }, { unique: true });
exports.UserTeam = (0, mongoose_1.model)("UserTeam", UserTeamSchema);
