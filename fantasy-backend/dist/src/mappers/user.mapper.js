"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUser = void 0;
const mapUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: {
        name: user.role?.name,
        permissions: user.role?.permissions || []
    },
    isBlocked: user.isBlocked,
    createdAt: user.createdAt
});
exports.mapUser = mapUser;
