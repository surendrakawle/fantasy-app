"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = askAI;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
const client = new openai_1.default({
    apiKey: env_1.env.OPENAI_API_KEY
});
async function askAI(prompt) {
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt
    });
    return response.output_text;
}
