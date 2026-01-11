import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { submitPrediction } from "../controllers/prediction.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Prediction
 *   description: Prediction APIs
 */

/**
 * @swagger
 * /predictions/submit:
 *   post:
 *     summary: Submit prediction
 *     tags: [Prediction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [contestId, predictionId, selectedAnswer]
 *             properties:
 *               contestId:
 *                 type: string
 *               predictionId:
 *                 type: string
 *               selectedAnswer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prediction submitted
 */
router.post("/submit", authMiddleware, submitPrediction);



export default router;
