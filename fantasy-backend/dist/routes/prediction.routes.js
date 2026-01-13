"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prediction_controller_1 = require("../controllers/prediction.controller");
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
exports.default = router;
