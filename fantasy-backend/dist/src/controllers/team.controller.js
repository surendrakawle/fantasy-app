"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTeam = exports.createTeam = void 0;
const team_service_1 = require("../services/team.service");
const apiResponse_1 = require("../utils/apiResponse");
const userTeam_mapper_1 = require("../mappers/userTeam.mapper");
const UserTeam_model_1 = require("../models/UserTeam.model");
const createTeam = async (req, res) => {
    try {
        const team = await team_service_1.TeamService.createTeam({
            ...req.body,
            userId: req.user.userId
        });
        return (0, apiResponse_1.success)(res, (0, userTeam_mapper_1.mapUserTeam)(team), "Team created", 201);
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 400);
    }
};
exports.createTeam = createTeam;
const getMyTeam = async (req, res) => {
    try {
        const { contestId } = req.params;
        const team = await UserTeam_model_1.UserTeam.findOne({
            contestId,
            userId: req.user.userId
        }).lean();
        if (!team) {
            return (0, apiResponse_1.error)(res, "Team not found", 404);
        }
        return (0, apiResponse_1.success)(res, (0, userTeam_mapper_1.mapUserTeam)(team), "Team fetched");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, 500);
    }
};
exports.getMyTeam = getMyTeam;
