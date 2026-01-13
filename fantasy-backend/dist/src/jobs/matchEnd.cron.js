"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const Match_model_1 = require("../models/Match.model");
const result_queue_1 = require("../queues/result.queue");
node_cron_1.default.schedule("*/5 * * * *", async () => {
    const matches = await Match_model_1.Match.find({
        status: "COMPLETED",
        resultProcessed: false
    });
    for (const match of matches) {
        await result_queue_1.resultQueue.add("calculate-result", { contestId: match._id }, { jobId: `result-${match._id}` } // idempotent
        );
        match.resultProcessed = true;
        await match.save();
    }
});
