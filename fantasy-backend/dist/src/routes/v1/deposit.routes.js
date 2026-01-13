"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deposit_controller_1 = require("../../controllers/deposit.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const admin_middleware_1 = require("../../middlewares/admin.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Deposits
 *   description: User & Admin deposit APIs
 */
/* ================= USER ================= */
/**
 * @swagger
 * /deposit:
 *   post:
 *     summary: Create UPI deposit request
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 500
 *     responses:
 *       201:
 *         description: Deposit request created
 *       400:
 *         description: Invalid amount
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth_middleware_1.authMiddleware, deposit_controller_1.createDepositRequest);
/* ================= ADMIN ================= */
/**
 * @swagger
 * /deposit/{id}/approve:
 *   post:
 *     summary: Approve UPI deposit
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 65dep123abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             utr: "1234567890"
 *     responses:
 *       200:
 *         description: Deposit approved
 *       400:
 *         description: Invalid deposit
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.post("/:id/approve", auth_middleware_1.authMiddleware, admin_middleware_1.adminOnly, deposit_controller_1.approveUpiDeposit);
/**
 * @swagger
 * /deposit/cash:
 *   post:
 *     summary: Admin cash deposit to user
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 65user123abc
 *             amount: 1000
 *     responses:
 *       200:
 *         description: Cash deposited
 *       400:
 *         description: Invalid payload
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.post("/cash", auth_middleware_1.authMiddleware, admin_middleware_1.adminOnly, deposit_controller_1.adminCashDeposit);
exports.default = router;
