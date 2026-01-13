"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAuthResponse = void 0;
const mapAuthResponse = (user, token) => ({
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        permission: user.permission
    }
});
exports.mapAuthResponse = mapAuthResponse;
