"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFraudScore = calculateFraudScore;
const FraudFlag_model_1 = require("../models/FraudFlag.model");
async function calculateFraudScore(input) {
    let score = 0;
    if (input.ipMismatch)
        score += 25;
    if (input.multipleAccounts)
        score += 40;
    if (input.fastWithdraw)
        score += 30;
    if (score >= 50) {
        await FraudFlag_model_1.FraudFlag.create({
            userId: input.userId,
            reason: "Suspicious behavior detected",
            severity: score >= 70 ? "HIGH" : "MEDIUM"
        });
    }
    return score;
}
