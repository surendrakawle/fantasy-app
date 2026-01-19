import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  submitPrediction,
  listMyPredictions
} from "../../controllers/userPrediction.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User Prediction
 *   description: User prediction APIs
 */

/**
 * @swagger
 * /user-predictions/submit:
 *   post:
 *     summary: Submit prediction with amount
 *     tags: [User Prediction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             contestId: 65abc111
 *             predictionId: 65pred222
 *             selectedAnswer: India
 *             amount: 50
 *     responses:
 *       201:
 *         description: Prediction submitted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Prediction submitted
 *               data:
 *                 amount: 50
 *                 multiplier: 3
 *                 potentialWin: 150
 *       400:
 *         description: Invalid input / Insufficient balance
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/submit", authMiddleware, submitPrediction);

/**
 * @swagger
 * /user-predictions/my/{contestId}:
 *   get:
 *     summary: List my predictions by contest
 *     tags: [User Prediction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contestId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: My predictions
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/my/:contestId", authMiddleware, listMyPredictions);

export default router;
