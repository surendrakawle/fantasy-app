"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const mongoose_1 = require("mongoose");
const PlayerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    team: {
        type: String,
        required: true,
        uppercase: true // IND / AUS
    },
    role: {
        type: String,
        enum: ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"],
        required: true
    },
    credit: {
        type: Number,
        required: true,
        min: 4,
        max: 12
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
/* Index for faster search */
PlayerSchema.index({ team: 1, role: 1 });
exports.Player = (0, mongoose_1.model)("Player", PlayerSchema);
