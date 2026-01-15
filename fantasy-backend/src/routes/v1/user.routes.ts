import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getMe, updateMyProfile } from "../../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User APIs
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get logged-in user profile
 *     description: Returns the profile of the currently authenticated user along with assigned role details.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 695a3d5a1cc78ab0010cd139
 *                     name:
 *                       type: string
 *                       example: Amit Sharma
 *                     email:
 *                       type: string
 *                       example: awesomeamitawesome@gmail.com
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 695a3d0a7ac0b46fb89bd961
 *                         name:
 *                           type: string
 *                           example: ADMIN
 *                         permissions:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example:
 *                             - CREATE_MATCH
 *                             - CREATE_CONTEST
 *                             - PUBLISH_RESULT
 *                     isBlocked:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-01-04T10:13:46.099Z
 *
 *       401:
 *         description: Unauthorized – token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid user request
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/me", authMiddleware, getMe);

/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: User self profile APIs
 */

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update my profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Name
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/profile", authMiddleware, updateMyProfile);

export default router;
