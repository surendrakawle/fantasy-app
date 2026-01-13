"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prediction = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    contestId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Contest", index: true },
    question: { type: String, required: true },
    options: { type: [String], required: true }, // ["Team A", "Team B"] or ["YES", "NO"]
    correctAnswer: String,
    points: { type: Number, default: 10 },
    order: { type: Number, default: 0 }, // UI order
});
exports.Prediction = (0, mongoose_1.model)("Prediction", schema);
