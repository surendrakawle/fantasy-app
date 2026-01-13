"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPlayer = void 0;
const mapPlayer = (player) => ({
    id: player._id,
    name: player.name,
    team: player.team,
    role: player.role,
    credit: player.credit,
    isActive: player.isActive
});
exports.mapPlayer = mapPlayer;
