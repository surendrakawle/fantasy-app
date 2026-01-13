"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", index: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    reference: String,
    createdAt: { type: Date, default: Date.now }
});
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
