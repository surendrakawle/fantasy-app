"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawRequest = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", index: true },
    amount: Number,
    tdsAmount: Number,
    netAmount: Number,
    status: { type: String, default: "PENDING" },
    processedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    processedAt: Date,
    rejectReason: String,
    createdAt: { type: Date, default: Date.now }
});
exports.WithdrawRequest = (0, mongoose_1.model)("WithdrawRequest", schema);
