"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdempotencyKey = getIdempotencyKey;
//Prevent duplicate operations (critical for wallet & queues)
function getIdempotencyKey(prefix, id) {
    return `${prefix}:${id}`;
}
