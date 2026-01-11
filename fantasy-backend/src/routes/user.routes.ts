import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMe } from "../controllers/user.controller";
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
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/me", authMiddleware, getMe);


export default router;
