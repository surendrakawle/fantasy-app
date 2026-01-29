import OpenAI from "openai";
import {env} from "../../config/env"

if (!env?.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing");
}

export const openai = new OpenAI({
  apiKey: env?.OPENAI_API_KEY || "",
});
