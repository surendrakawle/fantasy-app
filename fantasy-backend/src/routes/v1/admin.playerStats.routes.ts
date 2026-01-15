import { Router } from "express";
import { upsertPlayerStats } from "../../controllers/admin.playerStats.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Player Stats
 *   description: Admin APIs to add or update match player statistics
 */

/* -------------------------------------------------------------------------- */
/*                          UPSERT PLAYER STATS                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/player-stats:
 *   post:
 *     summary: Add or update player match statistics
 *     tags: [Admin Player Stats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             matchId: 65ca111abc
 *             playerId: 65ca301
 *             runs: 45
 *             wickets: 2
 *             catches: 1
 *             maidens: 0
 *     responses:
 *       200:
 *         description: Player stats saved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Player stats saved
 *               data:
 *                 id: 65cstats123
 *                 matchId: 65ca111abc
 *                 playerId: 65ca301
 *                 runs: 45
 *       400:
 *         description: Invalid request payload
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: matchId and playerId are required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       500:
 *         description: Internal server error
 */
router.post(
  "/player-stats",
  authMiddleware,
  adminOnly,
  upsertPlayerStats
);

export default router;
