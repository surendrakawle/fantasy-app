"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrediction = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", index: true },
    contestId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Contest", index: true },
    predictionId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Prediction" },
    selectedAnswer: { type: String, required: true },
    isCorrect: Boolean,
    pointsEarned: { type: Number, default: 0 }
});
schema.index({ userId: 1, contestId: 1, predictionId: 1 }, { unique: true });
exports.UserPrediction = (0, mongoose_1.model)("UserPrediction", schema);
