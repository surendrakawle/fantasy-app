"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionService = void 0;
const UserPrediction_model_1 = require("../models/UserPrediction.model");
const Prediction_model_1 = require("../models/Prediction.model");
const Contest_model_1 = require("../models/Contest.model");
class PredictionService {
    static async submitPrediction(params) {
        const { userId, contestId, predictionId, selectedAnswer } = params;
        /* -------------------- Validations -------------------- */
        if (!contestId || !predictionId || !selectedAnswer) {
            throw new Error("Missing required fields");
        }
        const contest = await Contest_model_1.Contest.findById(contestId);
        if (!contest) {
            throw new Error("Contest not found");
        }
        if (contest.status !== "OPEN") {
            throw new Error("Predictions are locked for this contest");
        }
        const prediction = await Prediction_model_1.Prediction.findById(predictionId);
        if (!prediction || prediction.contestId.toString() !== contestId) {
            throw new Error("Invalid prediction");
        }
        if (!prediction.options.includes(selectedAnswer)) {
            throw new Error("Invalid prediction answer");
        }
        /* -------------------- Prevent duplicate submission -------------------- */
        const alreadySubmitted = await UserPrediction_model_1.UserPrediction.findOne({
            userId,
            contestId,
            predictionId
        });
        if (alreadySubmitted) {
            throw new Error("Prediction already submitted");
        }
        /* -------------------- Save prediction -------------------- */
        return UserPrediction_model_1.UserPrediction.create({
            userId,
            contestId,
            predictionId,
            selectedAnswer
        });
    }
    static async getByContestId(contestId, page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [predictions, total] = await Promise.all([
            Prediction_model_1.Prediction.find({ contestId })
                .sort({ order: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Prediction_model_1.Prediction.countDocuments({ contestId })
        ]);
        return {
            predictions,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
exports.PredictionService = PredictionService;
