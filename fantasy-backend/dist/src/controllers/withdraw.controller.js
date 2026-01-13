"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestWithdraw = void 0;
const withdraw_service_1 = require("../services/withdraw.service");
const withdraw_mapper_1 = require("../mappers/withdraw.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const requestWithdraw = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.userId;
        const withdrawRequest = await withdraw_service_1.WithdrawalService.requestWithdraw(userId, amount);
        return (0, apiResponse_1.success)(res, (0, withdraw_mapper_1.mapWithdrawRequest)(withdrawRequest), "Withdraw request submitted", 201);
    }
    catch (err) {
        const status = err.message === "Insufficient wallet balance" ? 400 : 500;
        return (0, apiResponse_1.error)(res, err.message, status);
    }
};
exports.requestWithdraw = requestWithdraw;
