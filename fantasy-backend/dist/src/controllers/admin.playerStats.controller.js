"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertPlayerStats = void 0;
const PlayerStats_model_1 = require("../models/PlayerStats.model");
const apiResponse_1 = require("../utils/apiResponse");
const playerStats_mapper_1 = require("../mappers/playerStats.mapper");
const upsertPlayerStats = async (req, res) => {
    try {
        const { matchId, playerId } = req.body;
        const stats = await PlayerStats_model_1.PlayerStats.findOneAndUpdate({ matchId, playerId }, req.body, { upsert: true, new: true });
        return (0, apiResponse_1.success)(res, (0, playerStats_mapper_1.mapPlayerStats)(stats), "Player stats saved");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.upsertPlayerStats = upsertPlayerStats;
