import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

import {
  myTransactions,
  allTransactions
} from "../../controllers/transaction.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Wallet transaction history APIs
 */

/* ================= USER ================= */

/**
 * @swagger
 * /transactions/my:
 *   get:
 *     summary: Get my transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: type
 *         in: query
 *         example: WIN
 *       - name: contest
 *         in: query
 *         example: 65f1abc999
 *       - name: prediction
 *         in: query
 *         example: 65pred888
 *       - name: page
 *         in: query
 *         example: 1
 *       - name: limit
 *         in: query
 *         example: 20
 *     responses:
 *       200:
 *         description: Transaction list
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 page: 1
 *                 limit: 20
 *                 total: 2
 *                 list:
 *                   - type: WIN
 *                     amount: 150
 *                     reason: Prediction win
 *                     createdAt: 2026-01-10T10:20:00Z
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("transactions/my", authMiddleware, myTransactions);

/* ================= ADMIN ================= */

/**
 * @swagger
 * /admin/transactions:
 *   get:
 *     summary: Get all transactions (admin)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         example: 65user111
 *       - name: type
 *         in: query
 *         example: DEPOSIT
 *       - name: page
 *         in: query
 *         example: 1
 *       - name: limit
 *         in: query
 *         example: 50
 *     responses:
 *       200:
 *         description: Transaction list
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.get(
  "/admin/transactions",
  authMiddleware,
  adminOnly,
  allTransactions
);

export default router;
