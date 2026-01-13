"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCashDeposit = exports.approveUpiDeposit = exports.createDepositRequest = void 0;
const deposit_service_1 = require("../services/deposit.service");
const apiResponse_1 = require("../utils/apiResponse");
/* -------- USER -------- */
const createDepositRequest = async (req, res) => {
    try {
        const { amount } = req.body;
        const deposit = await deposit_service_1.DepositService.createUserDeposit(req.user.userId, amount);
        return (0, apiResponse_1.success)(res, deposit, "Deposit request created", 201);
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.createDepositRequest = createDepositRequest;
/* -------- ADMIN -------- */
const approveUpiDeposit = async (req, res) => {
    try {
        const deposit = await deposit_service_1.DepositService.approveUpiDeposit(req.params.id, req.body.utr, req.user.userId);
        return (0, apiResponse_1.success)(res, deposit, "Deposit approved");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.approveUpiDeposit = approveUpiDeposit;
const adminCashDeposit = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const deposit = await deposit_service_1.DepositService.adminCashDeposit(userId, amount, req.user.userId);
        return (0, apiResponse_1.success)(res, deposit, "Cash deposited");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.adminCashDeposit = adminCashDeposit;
