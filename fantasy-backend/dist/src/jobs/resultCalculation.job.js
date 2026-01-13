"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateResults = calculateResults;
const Prediction_model_1 = require("../models/Prediction.model");
const UserPrediction_model_1 = require("../models/UserPrediction.model");
const Result_model_1 = require("../models/Result.model");
async function calculateResults(contestId) {
    const answers = await UserPrediction_model_1.UserPrediction.find({ contestId });
    for (const ans of answers) {
        const q = await Prediction_model_1.Prediction.findById(ans.predictionId);
        if (!q)
            continue;
        ans.isCorrect = ans.selectedAnswer === q.correctAnswer;
        ans.pointsEarned = ans.isCorrect ? q.points : 0;
        await ans.save();
    }
    const leaderboard = await UserPrediction_model_1.UserPrediction.aggregate([
        { $match: { contestId } },
        {
            $group: {
                _id: "$userId",
                totalPoints: { $sum: "$pointsEarned" }
            }
        },
        { $sort: { totalPoints: -1 } }
    ]);
    let rank = 1;
    for (const user of leaderboard) {
        await Result_model_1.Result.create({
            contestId,
            userId: user._id,
            totalPoints: user.totalPoints,
            rank,
            winningAmount: rank === 1 ? 1000 : 0
        });
        rank++;
    }
}
