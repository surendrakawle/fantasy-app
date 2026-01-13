import { Router } from "express";
import {
  getMasterConfig,
  updateMasterConfig
} from "../../controllers/masterConfig.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Master Config
 *   description: Global website configuration
 */

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Get global website configuration
 *     tags: [Master Config]
 *     responses:
 *       200:
 *         description: Config fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 websiteName: Tata Online
 *                 support:
 *                   helpEmail: help@site.com
 *                   whatsappNumber: "+91xxxxxxxxxx"
 */
router.get("/", getMasterConfig);

/**
 * @swagger
 * /config:
 *   put:
 *     summary: Update global website configuration (Admin only)
 *     tags: [Master Config]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             websiteName: Tata Online
 *             support:
 *               helpEmail: help@site.com
 *               whatsappNumber: "+91xxxxxxxxxx"
 *             maintenance:
 *               enabled: false
 *     responses:
 *       200:
 *         description: Config updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.put("/", authMiddleware, adminOnly, updateMasterConfig);

export default router;
