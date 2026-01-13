"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinancialYear = getFinancialYear;
exports.addMinutes = addMinutes;
function getFinancialYear(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return month <= 3 ? `${year - 1}-${year}` : `${year}-${year + 1}`;
}
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
