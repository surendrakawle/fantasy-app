"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = hasPermission;
function hasPermission(permissions, required) {
    return permissions.includes("ALL") || permissions.includes(required);
}
