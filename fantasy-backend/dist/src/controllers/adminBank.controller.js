"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectUserBank = exports.approveUserBank = void 0;
const adminBank_service_1 = require("../services/adminBank.service");
const apiResponse_1 = require("../utils/apiResponse");
const userBankAccount_mapper_1 = require("../mappers/userBankAccount.mapper");
const approveUserBank = async (req, res) => {
    try {
        const bank = await adminBank_service_1.AdminBankService.approveBank(req.params.id, req.user.userId);
        return (0, apiResponse_1.success)(res, (0, userBankAccount_mapper_1.mapUserBankAccount)(bank), "Bank approved successfully");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.approveUserBank = approveUserBank;
const rejectUserBank = async (req, res) => {
    try {
        const bank = await adminBank_service_1.AdminBankService.rejectBank(req.params.id, req.user.userId, req.body.reason);
        return (0, apiResponse_1.success)(res, (0, userBankAccount_mapper_1.mapUserBankAccount)(bank), "Bank rejected successfully");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.rejectUserBank = rejectUserBank;
