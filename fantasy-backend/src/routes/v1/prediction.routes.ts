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
 * tags:
 *   name: Prediction
 *   description: Prediction question APIs
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
 *           example:
 *             contestId: 65abc111
 *             question: Who will win the toss?
 *             options: ["India", "Australia"]
 *             points: 10
 *             order: 1
 *     responses:
 *       201:
 *         description: Prediction created
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             correctAnswer: India
 *     responses:
 *       200:
 *         description: Correct answer published
 *       400:
 *         description: Invalid answer
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.post(
  "/admin/predictions/:id/publish",
  authMiddleware,
  adminOnly,
  publishCorrectAnswer
);

/* ================= USER ================= */

/**
 * @swagger
 * /predictions/contest/{contestId}:
 *   get:
 *     summary: Get predictions by contest
 *     tags: [Prediction]
 *     parameters:
 *       - name: contestId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prediction list
 *       500:
 *         description: Server error
 */
router.get("/predictions/contest/:contestId", listPredictionsByContest);

export default router;
