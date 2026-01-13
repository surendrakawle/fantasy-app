"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPrediction = void 0;
const mapPrediction = (prediction) => ({
    id: prediction._id,
    contestId: prediction.contestId,
    question: prediction.question,
    options: prediction.options,
    points: prediction.points,
    order: prediction.order,
    createdAt: prediction.createdAt
});
exports.mapPrediction = mapPrediction;
