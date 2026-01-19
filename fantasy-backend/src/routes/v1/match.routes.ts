import { Router } from "express";
import {
  createMatch,
  updateMatch,
  deleteMatch,
  getMatch,
  listUpcomingMatches,
  listAllMatches
} from "../../controllers/match.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Match
 *   description: Match management APIs
 */

/* ================= ADMIN ================= */

/**
 * @swagger
 * /admin/matches:
 *   post:
 *     summary: Create match
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             teamA: India
 *             teamB: Australia
 *             sport: CRICKET
 *             startTime: 2026-02-10T14:00:00Z
 *     responses:
 *       201:
 *         description: Match created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Match created
 *               data:
 *                 id: 65abc123
 *                 teamA: India
 *                 teamB: Australia
 *                 status: UPCOMING
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Internal server error
 */
router.post("/admin/matches", authMiddleware, adminOnly, createMatch);

/**
 * @swagger
 * /admin/matches/{id}:
 *   put:
 *     summary: Update match
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 65abc123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: LIVE
 *     responses:
 *       200:
 *         description: Match updated
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.put("/admin/matches/:id", authMiddleware, adminOnly, updateMatch);

/**
 * @swagger
 * /admin/matches/{id}:
 *   delete:
 *     summary: Delete match
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match deleted
 *       400:
 *         description: Match not found
 *       500:
 *         description: Server error
 */
router.delete("/admin/matches/:id", authMiddleware, adminOnly, deleteMatch);

/* ================= USER ================= */

/**
 * @swagger
 * /matches/upcoming:
 *   get:
 *     summary: List upcoming matches
 *     tags: [Match]
 *     responses:
 *       200:
 *         description: Upcoming matches
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 65abc123
 *                   teamA: India
 *                   teamB: Australia
 *                   status: UPCOMING
 *       500:
 *         description: Server error
 */
router.get("/matches/upcoming", listUpcomingMatches);

/**
 * @swagger
 * /matches:
 *   get:
 *     summary: List all matches
 *     tags: [Match]
 *     responses:
 *       200:
 *         description: All matches
 *       500:
 *         description: Server error
 */
router.get("/matches", listAllMatches);

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Get match by id
 *     tags: [Match]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 65abc123
 *     responses:
 *       200:
 *         description: Match details
 *       404:
 *         description: Match not found
 *       500:
 *         description: Server error
 */
router.get("/matches/:id", getMatch);

export default router;
