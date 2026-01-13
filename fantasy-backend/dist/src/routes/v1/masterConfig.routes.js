"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const masterConfig_controller_1 = require("../../controllers/masterConfig.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const admin_middleware_1 = require("../../middlewares/admin.middleware");
const router = (0, express_1.Router)();
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
router.get("/", masterConfig_controller_1.getMasterConfig);
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
router.put("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminOnly, masterConfig_controller_1.updateMasterConfig);
exports.default = router;
