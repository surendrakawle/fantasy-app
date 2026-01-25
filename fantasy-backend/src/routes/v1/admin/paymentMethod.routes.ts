import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { adminOnly } from "../../../middlewares/admin.middleware";
import { listUserPaymentMethodsAdmin } from "../../../controllers/admin/paymentMethod.admin.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Payment Methods
 *   description: Admin view of user payment methods
 */

/**
 * @swagger
 * /admin/users/{userId}/payment-methods:
 *   get:
 *     summary: Get payment methods of a user
 *     tags: [Admin Payment Methods]
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
 *         description: Payment methods fetched
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.get(
  "/users/:userId/payment-methods",
  authMiddleware,
  adminOnly,
  listUserPaymentMethodsAdmin
);

export default router;
