import { Router } from "express";
import {
  previewSettlement,
  settlePrediction,
  settleTeam
} from "../../controllers/settlement.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Settlement
 *   description: Contest settlement & profit/loss APIs
 */

/* ================= PREVIEW SETTLEMENT ================= */

/**
 * @swagger
 * /admin/settlement/{contestId}:
 *   get:
 *     summary: Preview settlement statistics
 *     description: >
 *       Returns profit/loss, total entries, total amount and other
 *       settlement-related statistics before final settlement.
 *     tags: [Settlement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contestId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 65abc123def4567890
 *     responses:
 *       200:
 *         description: Settlement stats fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Settlement stats fetched
 *               data:
 *                 contestId: 65abc123
 *                 contestType: PREDICTION
 *                 status: OPEN
 *                 totalEntries: 120
 *                 totalAmount: 12000
 *                 totalWin: 9500
 *                 profit: 2500
 *       400:
 *         description: Invalid contest or bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Contest not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Something went wrong
 */
router.get(
  "/admin/settlement/:contestId",
  authMiddleware,
  adminOnly,
  previewSettlement
);

/* ================= PREDICTION SETTLEMENT ================= */

/**
 * @swagger
 * /admin/settle/prediction/{contestId}:
 *   post:
 *     summary: Settle prediction contest
 *     description: >
 *       Settles all predictions for the contest, credits winning wallets,
 *       marks predictions as settled and closes the contest.
 *     tags: [Settlement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contestId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 65abc123def4567890
 *     responses:
 *       200:
 *         description: Prediction contest settled successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Prediction contest settled successfully
 *               data:
 *                 contestId: 65abc123
 *                 contestType: PREDICTION
 *                 status: COMPLETED
 *                 totalEntries: 120
 *                 totalAmount: 12000
 *                 totalWin: 9500
 *                 profit: 2500
 *       400:
 *         description: Contest already settled or invalid contest
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid prediction contest
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Something went wrong
 */
router.post(
  "/admin/settle/prediction/:contestId",
  authMiddleware,
  adminOnly,
  settlePrediction
);

/* ================= TEAM SETTLEMENT ================= */

/**
 * @swagger
 * /admin/settle/team/{contestId}:
 *   post:
 *     summary: Settle team contest
 *     description: >
 *       Calculates team scores, ranks users, distributes prize pool,
 *       credits wallets and closes the contest.
 *     tags: [Settlement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contestId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 65abc123def4567890
 *     responses:
 *       200:
 *         description: Team contest settled successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Team contest settled successfully
 *               data:
 *                 contestId: 65abc123
 *                 contestType: TEAM
 *                 status: COMPLETED
 *                 joinedUsers: 80
 *                 entryFee: 50
 *                 prizePool: 3500
 *                 totalAmount: 4000
 *                 platformMargin: 500
 *       400:
 *         description: Invalid team contest
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid team contest
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Something went wrong
 */
router.post(
  "/admin/settle/team/:contestId",
  authMiddleware,
  adminOnly,
  settleTeam
);

export default router;
