import { openai } from "./openai.client";
import { PLAYER_SUGGESTION_PROMPT } from "./prompts/playerSuggestion.prompt";

type PlayerInput = {
  playerId: string;
  name: string;
  role: string;
  credit: number;
  team: string;
};

export class PlayerAISuggestionService {
  static async suggestPlayers(params: {
    matchId: string;
    players: PlayerInput[];
    risk?: "LOW" | "MEDIUM" | "HIGH";
  }) {
    const { players, risk = "LOW" } = params;

    if (!players || players.length === 0) {
      throw new Error("Players list is required");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: risk === "HIGH" ? 0.9 : 0.4,
      messages: [
        {
          role: "system",
          content: PLAYER_SUGGESTION_PROMPT,
        },
        {
          role: "user",
          content: JSON.stringify({
            risk,
            players,
          }),
        },
      ],
    });

    const content =
      completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned empty response");
    }

    try {
      return JSON.parse(content);
    } catch {
      throw new Error("Invalid AI response format");
    }
  }
}
