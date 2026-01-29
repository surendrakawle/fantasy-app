import { Router } from "express";
import {
  createTeam,
  listTeams,
  getTeam,
  updateTeam,
  deleteTeam
} from "../../../controllers/admin/masterTeam.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { adminOnly } from "../../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Teams / Squads
 *   description: Master teams used in matches
 */

/**
 * @swagger
 * /admin/teams:
 *   post:
 *     summary: Create team
 *     tags: [Teams / Squads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team created
 *       400:
 *         description: Validation error
 */
router.post("/teams", authMiddleware, adminOnly, createTeam);

/**
 * @swagger
 * /admin/teams:
 *   get:
 *     summary: List teams
 *     tags: [Teams / Squads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team list
 */
router.get("/teams", authMiddleware, adminOnly, listTeams);

/**
 * @swagger
 * /admin/teams/{id}:
 *   get:
 *     summary: Get team
 *     tags: [Teams / Squads]
 */
router.get("/teams/:id", authMiddleware, adminOnly, getTeam);

/**
 * @swagger
 * /admin/teams/{id}:
 *   put:
 *     summary: Update team
 *     tags: [Teams / Squads]
 */
router.put("/teams/:id", authMiddleware, adminOnly, updateTeam);

/**
 * @swagger
 * /admin/teams/{id}:
 *   delete:
 *     summary: Delete team
 *     tags: [Teams / Squads]
 */
router.delete("/teams/:id", authMiddleware, adminOnly, deleteTeam);

export default router;
