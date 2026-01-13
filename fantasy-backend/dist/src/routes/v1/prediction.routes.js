"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const prediction_controller_1 = require("../../controllers/prediction.controller");
const router = (0, express_1.Router)();
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
router.post("/submit", auth_middleware_1.authMiddleware, prediction_controller_1.submitPrediction);
/**
 * @swagger
 * tags:
 *   name: Prediction
 *   description: Prediction based contest APIs
 */
/**
 * @swagger
 * /predictions/contest/{contestId}:
 *   get:
 *     summary: Get all predictions for a contest
 *     tags: [Prediction]
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 20
 *
 *     responses:
 *       200:
 *         description: Predictions fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Predictions fetched
 *               data:
 *                 predictions:
 *                   - id: 65pr1
 *                     question: Who will win the toss?
 *                     options: ["India", "Australia"]
 *                     points: 10
 *                     order: 1
 *                   - id: 65pr2
 *                     question: Total runs in powerplay ≥ 50?
 *                     options: ["YES", "NO"]
 *                     points: 5
 *                     order: 2
 *                 pagination:
 *                   page: 1
 *                   limit: 20
 *                   total: 8
 *                   totalPages: 1
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
router.get("/contest/:contestId", auth_middleware_1.authMiddleware, prediction_controller_1.getPredictionsByContest);
exports.default = router;
