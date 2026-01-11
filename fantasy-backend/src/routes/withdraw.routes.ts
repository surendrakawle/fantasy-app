import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requestWithdraw } from "../controllers/withdraw.controller";

const router = Router();
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
router.post("/request", authMiddleware, requestWithdraw);

export default router;
