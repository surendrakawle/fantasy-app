import { Request, Response } from "express";
import { PlayerAISuggestionService } from "../../services/ai/playerSuggestion.service";
import { success, error } from "../../utils/ApiResponse";

export const suggestPlayersAI = async (
  req: Request,
  res: Response
) => {
  try {
    const { matchId, players, risk } = req.body;

    if (!matchId || !players) {
      return error(
        res,
        "matchId and players are required",
        400
      );
    }

    const result =
      await PlayerAISuggestionService.suggestPlayers({
        matchId,
        players,
        risk,
      });

    return success(
      res,
      result,
      "AI player suggestions generated"
    );
  } catch (e: any) {
    return error(res, e.message, 500);
  }
};
