"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterPaymentMethod = void 0;
const mongoose_1 = require("mongoose");
const MasterPaymentMethodSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["BANK", "UPI"],
        required: true,
        index: true
    },
    label: String, // Display name
    /* -------- BANK -------- */
    bankName: String,
    accountName: String,
    accountNumber: String,
    ifsc: String,
    branch: String,
    /* -------- UPI -------- */
    upiId: String,
    upiHolderName: String,
    isActive: {
        type: Boolean,
        default: true,
        index: true
    }
}, { timestamps: true });
exports.MasterPaymentMethod = (0, mongoose_1.model)("MasterPaymentMethod", MasterPaymentMethodSchema);
