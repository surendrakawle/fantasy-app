"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const socket_1 = require("./socket");
const env_1 = require("./config/env");
//import "./cron/matchEnd.cron";
(0, db_1.connectDB)();
const server = http_1.default.createServer(app_1.default);
(0, socket_1.initSocket)(server);
server.listen(env_1.env.PORT, () => {
    console.log(`🚀 Server running on port ${env_1.env.PORT}`);
});
