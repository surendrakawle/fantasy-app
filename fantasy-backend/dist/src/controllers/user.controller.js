"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = exports.updateUserAdmin = exports.listUsers = exports.getMe = void 0;
const user_service_1 = require("../services/user.service");
const user_mapper_1 = require("../mappers/user.mapper");
const apiResponse_1 = require("../utils/apiResponse");
const getMe = async (req, res) => {
    try {
        const user = await user_service_1.UserService.getMe(req.user.userId);
        return (0, apiResponse_1.success)(res, (0, user_mapper_1.mapUser)(user), "User profile fetched");
    }
    catch (err) {
        return (0, apiResponse_1.error)(res, err.message, err.message === "User not found" ? 404 : 401);
    }
};
exports.getMe = getMe;
/* -------------------- ADMIN -------------------- */
const listUsers = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 20);
        const { users, pagination } = await user_service_1.UserService.listUsers(page, limit);
        return (0, apiResponse_1.success)(res, { users: users.map(user_mapper_1.mapUser), pagination }, "Users fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 500);
    }
};
exports.listUsers = listUsers;
const updateUserAdmin = async (req, res) => {
    try {
        const user = await user_service_1.UserService.updateUserByAdmin(req.params.id, req.body);
        return (0, apiResponse_1.success)(res, (0, user_mapper_1.mapUser)(user), "User updated");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.updateUserAdmin = updateUserAdmin;
/* -------------------- USER -------------------- */
const updateMyProfile = async (req, res) => {
    try {
        const user = await user_service_1.UserService.updateMyProfile(req.user.userId, req.body);
        return (0, apiResponse_1.success)(res, (0, user_mapper_1.mapUser)(user), "Profile updated");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.updateMyProfile = updateMyProfile;
