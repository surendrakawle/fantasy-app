"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TdsLedger = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    transactionId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Transaction" },
    tdsAmount: Number,
    financialYear: String,
    createdAt: { type: Date, default: Date.now }
});
exports.TdsLedger = (0, mongoose_1.model)("TdsLedger", schema);
