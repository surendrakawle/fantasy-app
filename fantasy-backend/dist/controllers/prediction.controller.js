"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitPrediction = void 0;
const UserPrediction_model_1 = require("../models/UserPrediction.model");
const submitPrediction = async (req, res) => {
    const { contestId, predictionId, selectedAnswer } = req.body;
    await UserPrediction_model_1.UserPrediction.create({
        userId: req.user.userId,
        contestId,
        predictionId,
        selectedAnswer
    });
    res.json({ message: "Prediction submitted" });
};
exports.submitPrediction = submitPrediction;
