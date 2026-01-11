import { Router } from "express";
import { googleLogin } from "../controllers/auth.controller";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/google-login:
 *   post:
 *     summary: Login using Google OAuth
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *       401:
 *         description: Invalid Google token
 */
router.post("/google-login", googleLogin);


export default router;
