"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectWithdraw = exports.approveWithdraw = exports.publishResult = exports.createPrediction = exports.createContest = exports.createMatch = void 0;
const admin_service_1 = require("../services/admin.service");
const apiResponse_1 = require("../utils/apiResponse");
const withdrawal_admin_service_1 = require("../services/withdrawal.admin.service");
const admin_mapper_1 = require("../mappers/admin.mapper");
/* -------------------- CREATE MATCH -------------------- */
const createMatch = async (req, res) => {
    try {
        const match = await admin_service_1.AdminService.createMatch(req.body);
        return (0, apiResponse_1.success)(res, (0, admin_mapper_1.mapMatch)(match), "Match created", 201);
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.createMatch = createMatch;
/* -------------------- CREATE CONTEST -------------------- */
const createContest = async (req, res) => {
    try {
        const contest = await admin_service_1.AdminService.createContest(req.body);
        return (0, apiResponse_1.success)(res, (0, admin_mapper_1.mapContest)(contest), "Contest created", 201);
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.createContest = createContest;
/* -------------------- CREATE PREDICTION -------------------- */
const createPrediction = async (req, res) => {
    try {
        const prediction = await admin_service_1.AdminService.createPrediction(req.body);
        return (0, apiResponse_1.success)(res, (0, admin_mapper_1.mapPrediction)(prediction), "Prediction created", 201);
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.createPrediction = createPrediction;
/* -------------------- PUBLISH RESULT -------------------- */
const publishResult = async (req, res) => {
    try {
        await admin_service_1.AdminService.publishResult(req.body.contestId);
        return (0, apiResponse_1.success)(res, null, "Result job queued");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.publishResult = publishResult;
const approveWithdraw = async (req, res) => {
    try {
        const wr = await withdrawal_admin_service_1.WithdrawalAdminService.approve(req.params.id, req.user.userId);
        return (0, apiResponse_1.success)(res, wr, "Withdrawal approved");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.approveWithdraw = approveWithdraw;
const rejectWithdraw = async (req, res) => {
    try {
        const wr = await withdrawal_admin_service_1.WithdrawalAdminService.reject(req.params.id, req.user.userId, req.body.reason);
        return (0, apiResponse_1.success)(res, wr, "Withdrawal rejected");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.rejectWithdraw = rejectWithdraw;
