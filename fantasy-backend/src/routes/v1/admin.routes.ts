import { Router } from "express";
import {
  createContest,
  createPrediction,
  publishResult,
  approveWithdraw,
  rejectWithdraw
} from "../../controllers/admin.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";
import { listUsers, updateUserAdmin } from "../../controllers/user.controller";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                               CREATE CONTEST                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/contest:
 *   post:
 *     summary: Create a contest for a match
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             matchId: 65ca111abc
 *             entryFee: 10
 *             prizePool: 1000
 *             maxParticipants: 100
 *             lockTime: 2026-02-10T13:30:00Z
 *             contestType: PREDICTION
 *     responses:
 *       201:
 *         description: Contest created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Contest created
 *               data:
 *                 id: 65ca222abc
 *                 prizePool: 1000
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/contest", authMiddleware, adminOnly, createContest);

/* -------------------------------------------------------------------------- */
/*                               CREATE PREDICTION                             */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/prediction:
 *   post:
 *     summary: Create a prediction question
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             contestId: 65ca222abc
 *             question: Who will win the toss?
 *             options: ["India", "Australia"]
 *             points: 10
 *     responses:
 *       201:
 *         description: Prediction created successfully
 *       400:
 *         description: Invalid prediction payload
 *       500:
 *         description: Internal server error
 */
router.post("/prediction", authMiddleware, adminOnly, createPrediction);

/* -------------------------------------------------------------------------- */
/*                               PUBLISH RESULT                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/publish-result:
 *   post:
 *     summary: Publish contest result & trigger calculation job
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             contestId: 65ca222abc
 *     responses:
 *       200:
 *         description: Result job queued successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Result job queued
 *       400:
 *         description: Contest not found or already completed
 *       500:
 *         description: Internal server error
 */
router.post("/publish-result", authMiddleware, adminOnly, publishResult);
/**
 * @swagger
 * tags:
 *   name: Admin Withdrawals
 *   description: Admin APIs to approve or reject withdrawal requests
 */

/* -------------------------------------------------------------------------- */
/*                           APPROVE WITHDRAWAL                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/withdraw/{id}/approve:
 *   post:
 *     summary: Approve a withdrawal request
 *     tags: [Admin Withdrawals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65dca111abc
 *     responses:
 *       200:
 *         description: Withdrawal approved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Withdrawal approved
 *               data:
 *                 id: 65dca111abc
 *                 amount: 1000
 *                 status: APPROVED
 *       400:
 *         description: Invalid withdrawal request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid withdrawal request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       500:
 *         description: Internal server error
 */
router.post(
  "/withdraw/:id/approve",
  authMiddleware,
  adminOnly,
  approveWithdraw
);

/* -------------------------------------------------------------------------- */
/*                           REJECT WITHDRAWAL                                 */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/withdraw/{id}/reject:
 *   post:
 *     summary: Reject a withdrawal request and refund amount
 *     tags: [Admin Withdrawals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65dca111abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             reason: Invalid bank details
 *     responses:
 *       200:
 *         description: Withdrawal rejected successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Withdrawal rejected
 *               data:
 *                 id: 65dca111abc
 *                 amount: 1000
 *                 status: REJECTED
 *       400:
 *         description: Invalid request or missing reason
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Rejection reason required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       500:
 *         description: Internal server error
 */
router.post(
  "/withdraw/:id/reject",
  authMiddleware,
  adminOnly,
  rejectWithdraw
);
/**
 * @swagger
 * tags:
 *   name: Admin Users
 *   description: Admin user management APIs
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List users
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Users fetched
 *               data:
 *                 users:
 *                   - id: 1
 *                     name: Amit
 *                     email: amit@gmail.com
 *                     role:
 *                       name: USER
 *                 pagination:
 *                   page: 1
 *                   total: 100
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Internal server error
 */
router.get("/users", authMiddleware, adminOnly, listUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Update user (admin)
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update
 *         schema:
 *           type: string
 *         example: 65ca3d5a1cc78ab0010cd139
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isBlocked:
 *                 type: boolean
 *                 example: true
 *               role:
 *                 type: string
 *                 example: 65ca3d0a7ac0b46fb89bd961
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User updated
 *               data:
 *                 id: 65ca3d5a1cc78ab0010cd139
 *                 name: Amit Sharma
 *                 email: amit@gmail.com
 *                 isBlocked: true
 *                 role:
 *                   name: ADMIN
 *
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid user ID or payload
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized access
 *
 *       403:
 *         description: Admin access only
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Admin privileges required
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */
router.put(
  "/users/:id",
  authMiddleware,
  adminOnly,
  updateUserAdmin
);


export default router;
