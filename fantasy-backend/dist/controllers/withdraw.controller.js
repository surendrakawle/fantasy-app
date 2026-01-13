"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestWithdraw = void 0;
const WithdrawRequest_model_1 = require("../models/WithdrawRequest.model");
const Wallet_model_1 = require("../models/Wallet.model");
const fraud_queue_1 = require("../queues/fraud.queue");
const requestWithdraw = async (req, res) => {
    const { amount } = req.body;
    const wallet = await Wallet_model_1.Wallet.findOne({ userId: req.user.userId });
    if (!wallet || wallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
    }
    const tds = amount * 0.3; // example 30%
    const net = amount - tds;
    await WithdrawRequest_model_1.WithdrawRequest.create({
        userId: req.user.userId,
        amount,
        tdsAmount: tds,
        netAmount: net
    });
    await fraud_queue_1.fraudQueue.add("fraud-check", {
        userId: req.user.userId,
        fastWithdraw: true
    });
    res.json({ message: "Withdraw request submitted" });
};
exports.requestWithdraw = requestWithdraw;
