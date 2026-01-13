"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Role_model_1 = require("../models/Role.model");
const env_1 = require("../config/env");
async function seedRoles() {
    await mongoose_1.default.connect(env_1.env.MONGO_URI);
    await Role_model_1.Role.insertMany([
        {
            name: "ADMIN",
            permissions: ["ALL"]
        },
        {
            name: "MODERATOR",
            permissions: ["CREATE_MATCH", "CREATE_CONTEST", "CREATE_PREDICTION"]
        },
        {
            name: "USER",
            permissions: []
        }
    ]);
    console.log("✅ Roles seeded");
    process.exit(0);
}
seedRoles();
