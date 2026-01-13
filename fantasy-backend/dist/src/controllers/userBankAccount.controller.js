"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMyBankAccount = exports.addMyBankAccount = exports.listMyBankAccounts = void 0;
const userBankAccount_service_1 = require("../services/userBankAccount.service");
const userBankAccount_mapper_1 = require("../mappers/userBankAccount.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const listMyBankAccounts = async (req, res) => {
    try {
        const accounts = await userBankAccount_service_1.UserBankAccountService.list(req.user.userId);
        return (0, apiResponse_1.success)(res, accounts.map(userBankAccount_mapper_1.mapUserBankAccount), "Bank accounts fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 500);
    }
};
exports.listMyBankAccounts = listMyBankAccounts;
const addMyBankAccount = async (req, res) => {
    try {
        const account = await userBankAccount_service_1.UserBankAccountService.add(req.user.userId, req.body);
        return (0, apiResponse_1.success)(res, (0, userBankAccount_mapper_1.mapUserBankAccount)(account), "Bank account added", 201);
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.addMyBankAccount = addMyBankAccount;
const removeMyBankAccount = async (req, res) => {
    try {
        const account = await userBankAccount_service_1.UserBankAccountService.remove(req.user.userId, req.params.id);
        return (0, apiResponse_1.success)(res, (0, userBankAccount_mapper_1.mapUserBankAccount)(account), "Bank account removed");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.removeMyBankAccount = removeMyBankAccount;
