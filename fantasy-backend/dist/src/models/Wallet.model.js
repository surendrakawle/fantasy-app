"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        index: true
    },
    balance: { type: Number, default: 0 },
    bonusBalance: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
