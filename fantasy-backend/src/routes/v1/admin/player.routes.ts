import { Router } from "express";
import {
  createPlayer,
  listPlayers,
  getPlayer,
  updatePlayer,
  deactivatePlayer
} from "../../../controllers/player.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { adminOnly } from "../../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Player
 *   description: Player management APIs
 */
/* -------------------------------------------------------------------------- */
/*                               CREATE PLAYER                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/players:
 *   post:
 *     summary: Create a new player (Admin only)
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Rohit Sharma
 *             team: IND
 *             role: BATSMAN
 *             credit: 10
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Player created
 *               data:
 *                 id: 65p3
 *                 name: Rohit Sharma
 *                 team: IND
 *                 role: BATSMAN
 *                 credit: 10
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: credit must be between 4 and 12
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
router.post("/players", authMiddleware, adminOnly, createPlayer);

/* -------------------------------------------------------------------------- */
/*                               UPDATE PLAYER                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/players/{id}:
 *   put:
 *     summary: Update player details (Admin only)
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65p3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             credit: 11
 *     responses:
 *       200:
 *         description: Player updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Player updated
 *               data:
 *                 id: 65p3
 *                 credit: 11
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.put("/players/:id", authMiddleware, adminOnly, updatePlayer);

/* -------------------------------------------------------------------------- */
/*                              DEACTIVATE PLAYER                              */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /admin/players/{id}:
 *   delete:
 *     summary: Deactivate player (Admin only)
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65p3
 *     responses:
 *       200:
 *         description: Player deactivated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Player deactivated
 *               data:
 *                 id: 65p3
 *                 isActive: false
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.delete("/players/:id", authMiddleware, adminOnly, deactivatePlayer);

export default router;
