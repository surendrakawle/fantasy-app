

import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getMyPredictionsByContest } from "../../controllers/userPrediction.controller";

const router = Router();





/**
 * @swagger
 * tags:
 *   name: User Predictions
 *   description: User selected answers APIs
 */

/**
 * @swagger
 * /user/predictions/{contestId}:
 *   get:
 *     summary: Get my selected prediction answers for a contest
 *     tags: [User Predictions]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         description: Contest ID
 *         schema:
 *           type: string
 *         example: 65ca222abc
 *
 *     responses:
 *       200:
 *         description: User predictions fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User predictions fetched
 *               data:
 *                 - predictionId: 65pr1
 *                   question: Who will win the toss?
 *                   options: ["India", "Australia"]
 *                   points: 10
 *                   selectedAnswer: India
 *                   order: 1
 *                 - predictionId: 65pr2
 *                   question: Total runs in powerplay ≥ 50?
 *                   options: ["YES", "NO"]
 *                   points: 5
 *                   selectedAnswer: YES
 *                   order: 2
 *
 *       400:
 *         description: Invalid contestId
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: contestId is required
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */
router.get(
  "/:contestId",
  authMiddleware,
  getMyPredictionsByContest
);

export default router;
