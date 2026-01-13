"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only APIs
 */
/**
 * @swagger
 * /admin/match:
 *   post:
 *     summary: Create match
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/match", admin_controller_1.createMatch);
/**
 * @swagger
 * /admin/contest:
 *   post:
 *     summary: Create contest
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/contest", admin_controller_1.createContest);
/**
 * @swagger
 * /admin/prediction:
 *   post:
 *     summary: Create prediction
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/prediction", admin_controller_1.createPrediction);
/**
 * @swagger
 * /admin/publish-result:
 *   post:
 *     summary: Publish contest result
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/publish-result", admin_controller_1.publishResult);
exports.default = router;
