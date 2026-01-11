import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard APIs
 */

/**
 * @swagger
 * /leaderboard/{contestId}:
 *   get:
 *     summary: Get contest leaderboard
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Leaderboard data
 */
router.get("/:contestId", getLeaderboard);

export default router;
