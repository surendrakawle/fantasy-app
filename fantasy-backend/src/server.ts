import http from "http";
import app from "./app";
import { connectDB } from "./config/db";
import { initSocket } from "./socket";
import { env } from "./config/env";
//import "./cron/matchEnd.cron";

connectDB();
const server = http.createServer(app);
initSocket(server);

server.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});
