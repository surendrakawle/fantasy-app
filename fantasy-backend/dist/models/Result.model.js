"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    contestId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Contest", index: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", index: true },
    totalPoints: Number,
    rank: Number,
    winningAmount: { type: Number, default: 0 },
    credited: { type: Boolean, default: false }
});
exports.Result = (0, mongoose_1.model)("Result", schema);
