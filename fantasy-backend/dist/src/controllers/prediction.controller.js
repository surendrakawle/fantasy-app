"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPredictionsByContest = exports.submitPrediction = void 0;
const prediction_service_1 = require("../services/prediction.service");
const userPrediction_mapper_1 = require("../mappers/userPrediction.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const prediction_mapper_1 = require("../mappers/prediction.mapper");
const submitPrediction = async (req, res) => {
    try {
        const { contestId, predictionId, selectedAnswer } = req.body;
        const userId = req.user.userId;
        const userPrediction = await prediction_service_1.PredictionService.submitPrediction({
            userId,
            contestId,
            predictionId,
            selectedAnswer
        });
        return (0, apiResponse_1.success)(res, (0, userPrediction_mapper_1.mapUserPrediction)(userPrediction), "Prediction submitted", 201);
    }
    catch (err) {
        const status = err.message === "Prediction already submitted" ? 409 : 400;
        return (0, apiResponse_1.error)(res, err.message, status);
    }
};
exports.submitPrediction = submitPrediction;
const getPredictionsByContest = async (req, res) => {
    try {
        const { contestId } = req.params;
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 50);
        if (!contestId) {
            return (0, apiResponse_1.error)(res, "contestId is required", 400);
        }
        const { predictions, pagination } = await prediction_service_1.PredictionService.getByContestId(contestId, page, limit);
        return (0, apiResponse_1.success)(res, {
            predictions: predictions.map(prediction_mapper_1.mapPrediction),
            pagination
        }, "Predictions fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 500);
    }
};
exports.getPredictionsByContest = getPredictionsByContest;
