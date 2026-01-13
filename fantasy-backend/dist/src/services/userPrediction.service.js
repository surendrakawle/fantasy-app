"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPredictionService = void 0;
const UserPrediction_model_1 = require("../models/UserPrediction.model");
class UserPredictionService {
    static async getUserPredictionsByContest(userId, contestId) {
        return UserPrediction_model_1.UserPrediction.aggregate([
            {
                $match: {
                    userId,
                    contestId
                }
            },
            {
                $lookup: {
                    from: "predictions",
                    localField: "predictionId",
                    foreignField: "_id",
                    as: "prediction"
                }
            },
            { $unwind: "$prediction" },
            {
                $sort: {
                    "prediction.order": 1
                }
            }
        ]);
    }
}
exports.UserPredictionService = UserPredictionService;
