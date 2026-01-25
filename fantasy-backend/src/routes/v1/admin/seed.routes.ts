import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { adminOnly } from "../../../middlewares/admin.middleware";
import { seedPlayers } from "../../../controllers/admin/seed.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Seed
 *   description: Database seed operations
 */

/**
 * @swagger
 * /admin/seed/players:
 *   post:
 *     summary: Seed players from JSON file
 *     tags: [Admin Seed]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             file: australia.json
 *     responses:
 *       200:
 *         description: Players seeded
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post(
  "/seed/players",
  authMiddleware,
  adminOnly,
  seedPlayers
);

export default router;
