"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapLeaderboard = void 0;
const mapLeaderboard = (raw) => {
    const result = [];
    for (let i = 0; i < raw.length; i += 2) {
        result.push({
            userId: raw[i],
            score: Number(raw[i + 1])
        });
    }
    return result;
};
exports.mapLeaderboard = mapLeaderboard;
