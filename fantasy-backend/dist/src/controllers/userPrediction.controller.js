"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPredictionsByContest = void 0;
const userPrediction_service_1 = require("../services/userPrediction.service");
const userPrediction_mapper_1 = require("../mappers/userPrediction.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const getMyPredictionsByContest = async (req, res) => {
    try {
        const { contestId } = req.params;
        if (!contestId) {
            return (0, apiResponse_1.error)(res, "contestId is required", 400);
        }
        const rows = await userPrediction_service_1.UserPredictionService.getUserPredictionsByContest(req.user.userId, contestId);
        return (0, apiResponse_1.success)(res, rows.map(userPrediction_mapper_1.mapUserPrediction), "User predictions fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 500);
    }
};
exports.getMyPredictionsByContest = getMyPredictionsByContest;
