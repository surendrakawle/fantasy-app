import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

import {
  createPrediction,
  updatePrediction,
  deletePrediction,
  publishCorrectAnswer,
  listPredictionsByContest
} from "../../controllers/prediction.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Prediction:
 *       type: object
 *       required:
 *         - contestId
 *         - question
 *         - options
 *         - points
 *       properties:
 *         _id:
 *           type: string
 *           example: 65pred123
 *         contestId:
 *           type: string
 *           example: 65contest123
 *         question:
 *           type: string
 *           example: Who will win the match?
 *         type:
 *           type: string
 *           enum: [SINGLE_CHOICE, MULTI_CHOICE]
 *           example: SINGLE_CHOICE
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           example: ["India", "Australia"]
 *         correctAnswer:
 *           type: string
 *           example: India
 *         points:
 *           type: number
 *           example: 10
 *         order:
 *           type: number
 *           example: 1
 *         odds:
 *           type: number
 *           example: 2.5
 *         status:
 *           type: string
 *           enum: [ACTIVE, LOCKED, RESULT_DECLARED]
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Something went wrong
 */

/**
 * @swagger
 * tags:
 *   name: Prediction
 *   description: Fantasy prediction question APIs
 */

/* ================= ADMIN ================= */

/**
 * @swagger
 * /admin/predictions:
 *   post:
 *     summary: Create prediction question
 *     tags: [Prediction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contestId
 *               - question
 *               - options
 *               - points
 *             properties:
 *               contestId:
 *                 type: string
 *                 example: 65contest123
 *               question:
 *                 type: string
 *                 example: Who will win the toss?
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["India", "Australia"]
 *               points:
 *                 type: number
 *                 example: 10
 *               order:
 *                 type: number
 *                 example: 1
 *               odds:
 *                 type: number
 *                 example: 2.5
 *     responses:
 *       201:
 *         description: Prediction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prediction'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Internal server error
 */
router.post("/admin/predictions", authMiddleware, adminOnly, createPrediction);

/**
 * @swagger
 * /admin/predictions/{id}:
 *   put:
 *     summary: Update prediction
 *     tags: [Prediction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prediction'
 *     responses:
 *       200:
 *         description: Prediction updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Prediction not found
 *       500:
 *         description: Server error
 */
router.put("/admin/predictions/:id", authMiddleware, adminOnly, updatePrediction);

/**
 * @swagger
 * /admin/predictions/{id}:
 *   delete:
 *     summary: Delete prediction
 *     tags: [Prediction]
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
 *         description: Prediction deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Prediction not found
 *       500:
 *         description: Server error
 */
router.delete("/admin/predictions/:id", authMiddleware, adminOnly, deletePrediction);

/**
 * @swagger
 * /admin/predictions/{id}/publish:
 *   post:
 *     summary: Publish correct answer
 *     tags: [Prediction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correctAnswer
 *             properties:
 *               correctAnswer:
 *                 type: string
 *                 example: India
 *     responses:
 *       200:
 *         description: Correct answer published
 *       400:
 *         description: Invalid answer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Prediction not found
 *       500:
 *         description: Server error
 */
router.post(
  "/admin/predictions/:id/publish",
  authMiddleware,
  adminOnly,
  publishCorrectAnswer
);

/* ================= FANTASY USER ================= */

/**
 * @swagger
 * /predictions/{contestId}:
 *   get:
 *     summary: Get predictions by contest (Fantasy User)
 *     tags: [Prediction]
 *     parameters:
 *       - name: contestId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prediction list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prediction'
 *       404:
 *         description: No predictions found
 *       500:
 *         description: Server error
 */
router.get(
  "/predictions/:contestId",
  listPredictionsByContest
);

export default router;
