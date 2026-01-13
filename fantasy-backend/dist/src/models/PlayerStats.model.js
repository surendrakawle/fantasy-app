"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStats = void 0;
const mongoose_1 = require("mongoose");
const PlayerStatsSchema = new mongoose_1.Schema({
    matchId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Match",
        required: true,
        index: true
    },
    playerId: {
        type: mongoose_1.Types.ObjectId,
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
}, {
    timestamps: true
});
/* -------------------- INDEXES -------------------- */
// One stat record per player per match
PlayerStatsSchema.index({ matchId: 1, playerId: 1 }, { unique: true });
exports.PlayerStats = (0, mongoose_1.model)("PlayerStats", PlayerStatsSchema);
