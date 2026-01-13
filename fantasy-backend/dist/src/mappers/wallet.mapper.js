"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWallet = void 0;
const mapWallet = (wallet) => ({
    balance: wallet.balance,
    bonusBalance: wallet.bonusBalance ?? 0,
    currency: wallet.currency || "INR",
    updatedAt: wallet.updatedAt
});
exports.mapWallet = mapWallet;
