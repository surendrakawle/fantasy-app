import { Router } from "express";
import {
  listMyBankAccounts,
  addMyBankAccount,
  removeMyBankAccount
} from "../../controllers/userBankAccount.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User Bank Accounts
 *   description: User bank account management
 */

/**
 * @swagger
 * /user/banks:
 *   get:
 *     summary: Get my bank accounts
 *     tags: [User Bank Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bank accounts fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 65ub1
 *                   bankName: HDFC
 *                   accountNumber: "******7890"
 *                   ifsc: HDFC0001234
 *                   isVerified: false
 *                   isPrimary: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/banks", authMiddleware, listMyBankAccounts);

/**
 * @swagger
 * /user/banks:
 *   post:
 *     summary: Add bank account
 *     tags: [User Bank Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             bankName: ICICI
 *             accountName: Surendra Kawle
 *             accountNumber: "9876543210"
 *             ifsc: ICIC0001234
 *             isPrimary: true
 *     responses:
 *       201:
 *         description: Bank account added
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/banks", authMiddleware, addMyBankAccount);

/**
 * @swagger
 * /user/banks/{id}:
 *   delete:
 *     summary: Remove bank account
 *     tags: [User Bank Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65ub1
 *     responses:
 *       200:
 *         description: Bank account removed
 *       400:
 *         description: Invalid bank ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete(
  "/banks/:id",
  authMiddleware,
  removeMyBankAccount
);

export default router;
