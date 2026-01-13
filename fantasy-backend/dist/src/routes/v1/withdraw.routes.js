"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const withdraw_controller_1 = require("../../controllers/withdraw.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Withdraw
 *   description: Withdrawal APIs
 */
/**
 * @swagger
 * /withdraw/request:
 *   post:
 *     summary: Request withdrawal
 *     tags: [Withdraw]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Withdrawal request submitted
 */
router.post("/request", auth_middleware_1.authMiddleware, withdraw_controller_1.requestWithdraw);
exports.default = router;
