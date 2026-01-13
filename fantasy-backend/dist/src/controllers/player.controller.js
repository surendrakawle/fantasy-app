"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivatePlayer = exports.updatePlayer = exports.getPlayer = exports.listPlayers = exports.createPlayer = void 0;
const player_service_1 = require("../services/player.service");
const player_mapper_1 = require("../mappers/player.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const createPlayer = async (req, res) => {
    try {
        const player = await player_service_1.PlayerService.create(req.body);
        return (0, apiResponse_1.success)(res, (0, player_mapper_1.mapPlayer)(player), "Player created", 201);
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.createPlayer = createPlayer;
const listPlayers = async (req, res) => {
    try {
        const { team, role } = req.query;
        const filters = {};
        if (team)
            filters.team = team;
        if (role)
            filters.role = role;
        const players = await player_service_1.PlayerService.list(filters);
        return (0, apiResponse_1.success)(res, players.map(player_mapper_1.mapPlayer), "Players fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 500);
    }
};
exports.listPlayers = listPlayers;
const getPlayer = async (req, res) => {
    try {
        const player = await player_service_1.PlayerService.getById(req.params.id);
        return (0, apiResponse_1.success)(res, (0, player_mapper_1.mapPlayer)(player), "Player fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 404);
    }
};
exports.getPlayer = getPlayer;
const updatePlayer = async (req, res) => {
    try {
        const player = await player_service_1.PlayerService.update(req.params.id, req.body);
        return (0, apiResponse_1.success)(res, (0, player_mapper_1.mapPlayer)(player), "Player updated");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.updatePlayer = updatePlayer;
const deactivatePlayer = async (req, res) => {
    try {
        const player = await player_service_1.PlayerService.deactivate(req.params.id);
        return (0, apiResponse_1.success)(res, (0, player_mapper_1.mapPlayer)(player), "Player deactivated");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.deactivatePlayer = deactivatePlayer;
