"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWithdrawRequest = void 0;
const mapWithdrawRequest = (wr) => ({
    id: wr._id,
    amount: wr.amount,
    tdsAmount: wr.tdsAmount,
    netAmount: wr.netAmount,
    status: wr.status,
    createdAt: wr.createdAt
});
exports.mapWithdrawRequest = mapWithdrawRequest;
