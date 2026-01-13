"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const wallet_controller_1 = require("../controllers/wallet.controller");
const router = (0, express_1.Router)();
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
router.get("/balance", auth_middleware_1.authMiddleware, wallet_controller_1.getBalance);
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
router.get("/transactions", auth_middleware_1.authMiddleware, wallet_controller_1.getTransactions);
exports.default = router;
