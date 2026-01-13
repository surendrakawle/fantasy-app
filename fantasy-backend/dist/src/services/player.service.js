"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const Player_model_1 = require("../models/Player.model");
class PlayerService {
    static async create(data) {
        return Player_model_1.Player.create(data);
    }
    static async list(filters = {}) {
        return Player_model_1.Player.find({ isActive: true, ...filters }, null, { sort: { name: 1 } }).lean();
    }
    static async getById(playerId) {
        const player = await Player_model_1.Player.findById(playerId).lean();
        if (!player) {
            throw new Error("Player not found");
        }
        return player;
    }
    static async update(playerId, data) {
        const updated = await Player_model_1.Player.findByIdAndUpdate(playerId, data, { new: true });
        if (!updated) {
            throw new Error("Player not found");
        }
        return updated;
    }
    static async deactivate(playerId) {
        const player = await Player_model_1.Player.findByIdAndUpdate(playerId, { isActive: false }, { new: true });
        if (!player) {
            throw new Error("Player not found");
        }
        return player;
    }
}
exports.PlayerService = PlayerService;
