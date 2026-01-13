"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.getBalance = void 0;
const wallet_service_1 = require("../services/wallet.service");
const apiResponse_1 = require("../utils/apiResponse");
const wallet_mapper_1 = require("../mappers/wallet.mapper");
const transaction_mapper_1 = require("../mappers/transaction.mapper");
/* -------------------- GET WALLET BALANCE -------------------- */
const getBalance = async (req, res) => {
    try {
        const wallet = await wallet_service_1.WalletService.getBalance(req.user.userId);
        return (0, apiResponse_1.success)(res, (0, wallet_mapper_1.mapWallet)(wallet), "Wallet balance fetched");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 404);
    }
};
exports.getBalance = getBalance;
/* -------------------- GET WALLET TRANSACTIONS -------------------- */
const getTransactions = async (req, res) => {
    try {
        const transactions = await wallet_service_1.WalletService.getTransactions(req.user.userId);
        return (0, apiResponse_1.success)(res, transactions.map(transaction_mapper_1.mapTransaction), "Transactions fetched");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message);
    }
};
exports.getTransactions = getTransactions;
