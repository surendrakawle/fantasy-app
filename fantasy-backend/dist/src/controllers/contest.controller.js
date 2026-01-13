"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinContest = exports.listContests = void 0;
const contest_service_1 = require("../services/contest.service");
const apiResponse_1 = require("../utils/apiResponse");
const contest_mapper_1 = require("../mappers/contest.mapper");
/* -------------------- LIST CONTESTS -------------------- */
const listContests = async (_req, res) => {
    try {
        const contests = await contest_service_1.ContestService.listOpenContests();
        return (0, apiResponse_1.success)(res, contests.map(contest_mapper_1.mapContest), "Open contests fetched");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message);
    }
};
exports.listContests = listContests;
/* -------------------- JOIN CONTEST -------------------- */
const joinContest = async (req, res) => {
    try {
        const contestId = req.params.id;
        const userId = req.user.userId;
        const contest = await contest_service_1.ContestService.joinContest(userId, contestId);
        return (0, apiResponse_1.success)(res, (0, contest_mapper_1.mapContest)(contest), "Contest joined successfully");
    }
    catch (err) {
        const status = err.message === "Already joined contest" ? 409 : 400;
        return (0, apiResponse_1.error)(res, err.message, status);
    }
};
exports.joinContest = joinContest;
