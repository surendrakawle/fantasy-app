import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { adminOnly } from "../../../middlewares/admin.middleware";
import { commonSeed } from "../../../controllers/admin/commonSeed.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Seed
 *   description: Common database seeding
 */

/**
 * @swagger
 * /admin/seed:
 *   post:
 *     summary: Seed database from JSON file
 *     tags: [Admin Seed]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             file: players.json
 *             model: Player
 *             uniqueBy: ["name", "team"]
 *     responses:
 *       200:
 *         description: Seed successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post(
  "/seed",
  authMiddleware,
  adminOnly,
  commonSeed
);

export default router;
