"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositRequest = void 0;
const mongoose_1 = require("mongoose");
const DepositRequestSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", index: true },
    amount: { type: Number, required: true },
    method: {
        type: String,
        enum: ["UPI", "CASH"],
        required: true
    },
    upiId: String, // master UPI
    utr: String, // user provided
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING"
    },
    approvedBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });
exports.DepositRequest = (0, mongoose_1.model)("DepositRequest", DepositRequestSchema);
