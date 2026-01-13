"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserBankAccount = void 0;
const mapUserBankAccount = (doc) => ({
    id: doc._id,
    bankName: doc.bankName,
    accountName: doc.accountName,
    accountNumber: doc.accountNumber.replace(/\d(?=\d{4})/g, "*"),
    ifsc: doc.ifsc,
    isVerified: doc.isVerified,
    isPrimary: doc.isPrimary
});
exports.mapUserBankAccount = mapUserBankAccount;
