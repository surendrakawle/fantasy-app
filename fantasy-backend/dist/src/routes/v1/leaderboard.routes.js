"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_controller_1 = require("../../controllers/leaderboard.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Contest leaderboard APIs
 */
/**
 * @swagger
 * /leaderboard/{contestId}:
 *   get:
 *     summary: Get top users leaderboard for a contest
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65ca222abc
 *     responses:
 *       200:
 *         description: Leaderboard fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Leaderboard fetched
 *               data:
 *                 - userId: "695a3d5a1cc78ab0010cd139"
 *                   score: 120
 *                 - userId: "695a3d5a1cc78ab0010cd140"
 *                   score: 110
 *       400:
 *         description: Invalid contestId or request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: contestId is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */
router.get("/:contestId", leaderboard_controller_1.getLeaderboard);
/**
 * @swagger
 * /leaderboard/{contestId}/me:
 *   get:
 *     summary: Get logged-in user's rank in a contest
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65ca222abc
 *     responses:
 *       200:
 *         description: User rank fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User rank fetched
 *               data:
 *                 rank: 3
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: contestId is required
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized access
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */
router.get("/:contestId/me", auth_middleware_1.authMiddleware, leaderboard_controller_1.getMyRank);
exports.default = router;
