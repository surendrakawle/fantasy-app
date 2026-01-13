"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "*"
        }
    });
    io.on("connection", (socket) => {
        console.log("🔌 Client connected:", socket.id);
        socket.on("join-contest", (contestId) => {
            socket.join(`contest:${contestId}`);
        });
        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });
    return io;
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io)
        throw new Error("Socket.io not initialized");
    return io;
};
exports.getIO = getIO;
