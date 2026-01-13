"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInput = sanitizeInput;
function sanitizeInput(input) {
    if (typeof input === "string") {
        return input.replace(/[<>$]/g, "");
    }
    if (typeof input === "object") {
        for (const key in input) {
            input[key] = sanitizeInput(input[key]);
        }
    }
    return input;
}
