import { Router } from "express";
import {
  createDepositRequest,
  approveUpiDeposit,
  adminCashDeposit
} from "../../controllers/deposit.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

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
router.post(
  "/",
  authMiddleware,
  createDepositRequest
);

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
router.post(
  "/:id/approve",
  authMiddleware,
  adminOnly,
  approveUpiDeposit
);

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
router.post(
  "/cash",
  authMiddleware,
  adminOnly,
  adminCashDeposit
);

export default router;
