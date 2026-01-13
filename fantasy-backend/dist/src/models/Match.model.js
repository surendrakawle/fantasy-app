"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const mongoose_1 = require("mongoose");
const matchSchema = new mongoose_1.Schema({
    sport: { type: String, default: "CRICKET" },
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    startTime: { type: Date, required: true },
    status: { type: String, default: "UPCOMING", index: true },
    resultProcessed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
exports.Match = (0, mongoose_1.model)("Match", matchSchema);
