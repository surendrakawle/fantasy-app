"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_playerStats_controller_1 = require("../../controllers/admin.playerStats.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const admin_middleware_1 = require("../../middlewares/admin.middleware");
const router = (0, express_1.Router)();
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
router.post("/player-stats", auth_middleware_1.authMiddleware, admin_middleware_1.adminOnly, admin_playerStats_controller_1.upsertPlayerStats);
exports.default = router;
