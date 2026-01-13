"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestParticipant = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    contestId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Contest", index: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", index: true },
    joinedAt: { type: Date, default: Date.now }
});
schema.index({ contestId: 1, userId: 1 }, { unique: true });
exports.ContestParticipant = (0, mongoose_1.model)("ContestParticipant", schema);
