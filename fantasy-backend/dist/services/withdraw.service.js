"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTDS = calculateTDS;
function calculateTDS(amount) {
    const TDS_RATE = 0.3; // 30%
    const tds = amount * TDS_RATE;
    return {
        tdsAmount: tds,
        netAmount: amount - tds
    };
}
