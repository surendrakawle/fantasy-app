import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getBalance, getTransactions } from "../controllers/wallet.controller";

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
router.get("/balance", authMiddleware, getBalance);

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
router.get("/transactions", authMiddleware, getTransactions);



export default router;
