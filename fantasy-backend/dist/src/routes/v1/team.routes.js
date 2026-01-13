"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../../controllers/team.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Fantasy team management APIs
 */
/* -------------------------------------------------------------------------- */
/*                               CREATE TEAM                                  */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create fantasy team for a contest
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             contestId: 65ca222abc
 *             matchId: 65ca111abc
 *             totalCredits: 98
 *             players:
 *               - playerId: 65ca301
 *                 isCaptain: true
 *                 isViceCaptain: false
 *               - playerId: 65ca302
 *                 isCaptain: false
 *                 isViceCaptain: true
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Team created
 *               data:
 *                 id: 65cteam123
 *                 contestId: 65ca222abc
 *                 totalCredits: 98
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Team must have exactly 11 players
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", auth_middleware_1.authMiddleware, team_controller_1.createTeam);
/* -------------------------------------------------------------------------- */
/*                               GET MY TEAM                                  */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /teams/my/{contestId}:
 *   get:
 *     summary: Get logged-in user's team for a contest
 *     tags: [Team]
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
 *         description: Team fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Team fetched
 *               data:
 *                 id: 65cteam123
 *                 contestId: 65ca222abc
 *                 players:
 *                   - playerId: 65ca301
 *                     isCaptain: true
 *                     isViceCaptain: false
 *       400:
 *         description: Invalid contestId
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
router.get("/my/:contestId", auth_middleware_1.authMiddleware, team_controller_1.getMyTeam);
exports.default = router;
