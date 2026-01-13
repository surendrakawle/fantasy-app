"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMasterPaymentMethod = void 0;
const mapMasterPaymentMethod = (doc) => ({
    id: doc._id,
    type: doc.type,
    label: doc.label,
    bank: doc.type === "BANK"
        ? {
            bankName: doc.bankName,
            accountName: doc.accountName,
            accountNumber: doc.accountNumber,
            ifsc: doc.ifsc,
            branch: doc.branch
        }
        : null,
    upi: doc.type === "UPI"
        ? {
            upiId: doc.upiId,
            holderName: doc.upiHolderName
        }
        : null,
    isActive: doc.isActive
});
exports.mapMasterPaymentMethod = mapMasterPaymentMethod;
