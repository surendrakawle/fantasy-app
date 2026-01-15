import { Router } from "express";
import {
  approveUserBank,
  rejectUserBank
} from "../../controllers/adminBank.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Banks
 *   description: Admin bank approval APIs
 */

/**
 * @swagger
 * /admin/user-banks/{id}/approve:
 *   put:
 *     summary: Approve user bank account
 *     tags: [Admin Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65ub123abc
 *     responses:
 *       200:
 *         description: Bank approved
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Bank approved successfully
 *       400:
 *         description: Bank not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.put(
  "/user-banks/:id/approve",
  authMiddleware,
  adminOnly,
  approveUserBank
);

/**
 * @swagger
 * /admin/user-banks/{id}/reject:
 *   put:
 *     summary: Reject user bank account
 *     tags: [Admin Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65ub123abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             reason: Name mismatch
 *     responses:
 *       200:
 *         description: Bank rejected
 *       400:
 *         description: Bank not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.put(
  "/user-banks/:id/reject",
  authMiddleware,
  adminOnly,
  rejectUserBank
);

export default router;
