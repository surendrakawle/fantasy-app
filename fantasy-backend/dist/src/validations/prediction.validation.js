"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitPredictionSchema = void 0;
const zod_1 = require("zod");
exports.submitPredictionSchema = zod_1.z.object({
    contestId: zod_1.z.string().length(24),
    predictionId: zod_1.z.string().length(24),
    selectedAnswer: zod_1.z.string().min(1)
});
