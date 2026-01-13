"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.getBalance = void 0;
const Wallet_model_1 = require("../models/Wallet.model");
const Transaction_model_1 = require("../models/Transaction.model");
const getBalance = async (req, res) => {
    const wallet = await Wallet_model_1.Wallet.findOne({ userId: req.user.userId });
    res.json(wallet);
};
exports.getBalance = getBalance;
const getTransactions = async (req, res) => {
    const txns = await Transaction_model_1.Transaction.find({ userId: req.user.userId })
        .sort({ createdAt: -1 });
    res.json(txns);
};
exports.getTransactions = getTransactions;
