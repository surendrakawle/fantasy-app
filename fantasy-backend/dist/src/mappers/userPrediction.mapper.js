"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserPrediction = void 0;
const mapUserPrediction = (up) => ({
    id: up._id,
    contestId: up.contestId,
    predictionId: up.predictionId,
    selectedAnswer: up.selectedAnswer,
    createdAt: up.createdAt
});
exports.mapUserPrediction = mapUserPrediction;
