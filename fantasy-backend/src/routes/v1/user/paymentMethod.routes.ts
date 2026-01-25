import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import {
  listMyPaymentMethods,
  addMyPaymentMethod,
  updateMyPaymentMethod,
  removeMyPaymentMethod,
} from "../../../controllers/userPaymentMethod.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User Payment Methods
 *   description: Manage user payment methods (Bank / UPI / Wallet)
 */

/**
 * @swagger
 * /user/payment-methods:
 *   get:
 *     summary: Get my payment methods
 *     tags: [User Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment methods fetched
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/payment-methods", authMiddleware, listMyPaymentMethods);

/**
 * @swagger
 * /user/payment-methods:
 *   post:
 *     summary: Add payment method
 *     tags: [User Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [BANK, UPI, WALLET]
 *               bankName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               ifsc:
 *                 type: string
 *               upiId:
 *                 type: string
 *               provider:
 *                 type: string
 *                 enum: [PAYTM, PHONEPE, OTHER]
 *               phoneNumber:
 *                 type: string
 *               isPrimary:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Payment method added
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/payment-methods", authMiddleware, addMyPaymentMethod);

/**
 * @swagger
 * /user/payment-methods/{id}:
 *   put:
 *     summary: Update payment method
 *     tags: [User Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment method updated
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/payment-methods/:id", authMiddleware, updateMyPaymentMethod);

/**
 * @swagger
 * /user/payment-methods/{id}:
 *   delete:
 *     summary: Remove payment method
 *     tags: [User Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment method removed
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/payment-methods/:id", authMiddleware, removeMyPaymentMethod);

export default router;
