"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contest = void 0;
const mongoose_1 = require("mongoose");
const contestSchema = new mongoose_1.Schema({
    matchId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Match",
        index: true
    },
    entryFee: { type: Number, required: true },
    prizePool: { type: Number, required: true },
    maxParticipants: { type: Number, required: true },
    joinedCount: { type: Number, default: 0 },
    status: { type: String, default: "OPEN", index: true },
    createdAt: { type: Date, default: Date.now }
});
exports.Contest = (0, mongoose_1.model)("Contest", contestSchema);
