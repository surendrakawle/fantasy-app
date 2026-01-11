import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { joinContest, listContests } from "../controllers/contest.controller";

const router = Router();

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
router.get("/", listContests);

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
router.post("/:id/join", authMiddleware, joinContest);

export default router;

