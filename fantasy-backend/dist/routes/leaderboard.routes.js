"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
const router = (0, express_1.Router)();
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
router.get("/:contestId", leaderboard_controller_1.getLeaderboard);
exports.default = router;
