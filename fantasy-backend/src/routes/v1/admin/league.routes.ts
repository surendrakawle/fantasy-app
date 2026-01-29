import { Router } from "express";
import {
  createLeague,
  listLeagues,
  updateLeague,
  deleteLeague
} from "../../../controllers/admin/league.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { adminOnly } from "../../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Leagues
 *   description: League management
 */

/**
 * @swagger
 * /admin/leagues:
 *   post:
 *     summary: Create league
 *     tags: [Leagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: League created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
  "/leagues",
  authMiddleware,
  adminOnly,
  createLeague
);

/**
 * @swagger
 * /admin/leagues:
 *   get:
 *     summary: List leagues
 *     tags: [Leagues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: includeInactive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: League list
 */
router.get(
  "/leagues",
  authMiddleware,
  adminOnly,
  listLeagues
);

/**
 * @swagger
 * /admin/leagues/{id}:
 *   put:
 *     summary: Update league
 *     tags: [Leagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: League updated
 *       400:
 *         description: Invalid ID
 */
router.put(
  "/leagues/:id",
  authMiddleware,
  adminOnly,
  updateLeague
);

/**
 * @swagger
 * /admin/leagues/{id}:
 *   delete:
 *     summary: Delete league
 *     tags: [Leagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: League deleted
 */
router.delete(
  "/leagues/:id",
  authMiddleware,
  adminOnly,
  deleteLeague
);

export default router;
