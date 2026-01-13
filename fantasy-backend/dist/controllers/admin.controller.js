"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishResult = exports.createPrediction = exports.createContest = exports.createMatch = void 0;
const Match_model_1 = require("../models/Match.model");
const Contest_model_1 = require("../models/Contest.model");
const Prediction_model_1 = require("../models/Prediction.model");
const result_queue_1 = require("../queues/result.queue");
const createMatch = async (req, res) => {
    const match = await Match_model_1.Match.create(req.body);
    res.json(match);
};
exports.createMatch = createMatch;
const createContest = async (req, res) => {
    const contest = await Contest_model_1.Contest.create(req.body);
    res.json(contest);
};
exports.createContest = createContest;
const createPrediction = async (req, res) => {
    const prediction = await Prediction_model_1.Prediction.create(req.body);
    res.json(prediction);
};
exports.createPrediction = createPrediction;
const publishResult = async (req, res) => {
    const { contestId } = req.body;
    await result_queue_1.resultQueue.add("calculate-result", { contestId }, { jobId: `result-${contestId}` });
    res.json({ message: "Result job queued" });
};
exports.publishResult = publishResult;
