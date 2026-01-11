import OpenAI from "openai";
import { env } from "../config/env";

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

export async function askAI(prompt: string): Promise<string> {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
  });

  return response.output_text;
}
