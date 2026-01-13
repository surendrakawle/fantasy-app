"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraudFlag = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", index: true },
    reason: String,
    severity: { type: String, default: "LOW" },
    resolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
exports.FraudFlag = (0, mongoose_1.model)("FraudFlag", schema);
