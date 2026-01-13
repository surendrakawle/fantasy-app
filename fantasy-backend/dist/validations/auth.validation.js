"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLoginSchema = void 0;
const zod_1 = require("zod");
exports.googleLoginSchema = zod_1.z.object({
    token: zod_1.z.string().min(10)
});
