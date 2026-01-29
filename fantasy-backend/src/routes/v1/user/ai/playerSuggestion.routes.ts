import { Router } from "express";
import { suggestPlayersAI } from "../../../../controllers/ai/playerSuggestion.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI suggestions for fantasy users
 */

/**
 * @swagger
 * /ai/suggest-players:
 *   post:
 *     summary: AI suggests players to select
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             matchId: "69762b43cb0ef33424a91d3f"
 *             risk: "LOW"
 *             players:
 *               - playerId: "p1"
 *                 name: "Virat Kohli"
 *                 role: "BATSMAN"
 *                 credit: 10
 *                 team: "IND"
 *               - playerId: "p2"
 *                 name: "Rohit Sharma"
 *                 role: "BATSMAN"
 *                 credit: 9.5
 *                 team: "IND"
 *     responses:
 *       200:
 *         description: Suggested players
 *       400:
 *         description: Invalid input
 *       500:
 *         description: AI error
 */
router.post("/ai/suggest-players", suggestPlayersAI);

export default router;
