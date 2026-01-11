import { Router } from "express";
import {
  createMatch,
  createContest,
  createPrediction,
  publishResult
} from "../controllers/admin.controller";

const router = Router();

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
router.post("/match", createMatch);

/**
 * @swagger
 * /admin/contest:
 *   post:
 *     summary: Create contest
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/contest", createContest);

/**
 * @swagger
 * /admin/prediction:
 *   post:
 *     summary: Create prediction
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/prediction", createPrediction);

/**
 * @swagger
 * /admin/publish-result:
 *   post:
 *     summary: Publish contest result
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post("/publish-result", publishResult);


export default router;
