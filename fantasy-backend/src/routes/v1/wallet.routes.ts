import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";
import {
    getBalance, getTransactions, getUserWalletBalanceAdmin,
    getUserWalletTransactionsAdmin,
} from "../../controllers/wallet.controller";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet APIs
 */

/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance
 */
router.get("/wallet/balance", authMiddleware, getBalance);

/**
 * @swagger
 * /wallet/transactions:
 *   get:
 *     summary: Get wallet transactions
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction list
 */
router.get("/wallet/transactions", authMiddleware, getTransactions);

/**
 * @swagger
 * /admin/wallet/{userId}/balance:
 *   get:
 *     summary: Get wallet balance of a user (Admin)
 *     tags: [Admin Wallet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet balance
 */
router.get(
    "/admin/wallet/:userId/balance",
    authMiddleware,
    adminOnly,
    getUserWalletBalanceAdmin
);

/**
 * @swagger
 * /admin/wallet/{userId}/transactions:
 *   get:
 *     summary: Get wallet transactions of a user (Admin)
 *     tags: [Admin Wallet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet transactions
 */
router.get(
    "/admin/wallet/:userId/transactions",
    authMiddleware,
    adminOnly,
    getUserWalletTransactionsAdmin
);

export default router; 