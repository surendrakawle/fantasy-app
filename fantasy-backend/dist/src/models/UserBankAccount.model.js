"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBankAccount = void 0;
const mongoose_1 = require("mongoose");
const UserBankAccountSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        index: true,
        required: true
    },
    bankName: String,
    accountName: String,
    accountNumber: String,
    ifsc: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    isPrimary: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verification: {
        status: {
            type: String,
            enum: ["PENDING", "VERIFIED", "FAILED"],
            default: "PENDING"
        },
        verifiedAt: Date,
        referenceId: String
    },
}, { timestamps: true });
/* Only one primary account per user */
UserBankAccountSchema.index({ userId: 1, isPrimary: 1 }, { unique: true, partialFilterExpression: { isPrimary: true } });
exports.UserBankAccount = (0, mongoose_1.model)("UserBankAccount", UserBankAccountSchema);
