"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const contest_controller_1 = require("../controllers/contest.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Contest
 *   description: Contest APIs
 */
/**
 * @swagger
 * /contests:
 *   get:
 *     summary: List available contests
 *     tags: [Contest]
 *     responses:
 *       200:
 *         description: Contest list
 */
router.get("/", contest_controller_1.listContests);
/**
 * @swagger
 * /contests/{id}/join:
 *   post:
 *     summary: Join a contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest joined successfully
 *       409:
 *         description: Already joined
 */
router.post("/:id/join", auth_middleware_1.authMiddleware, contest_controller_1.joinContest);
exports.default = router;
