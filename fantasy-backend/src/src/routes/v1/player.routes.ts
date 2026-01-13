import { Router } from "express";
import {
  createPlayer,
  listPlayers,
  getPlayer,
  updatePlayer,
  deactivatePlayer
} from "../../controllers/player.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Player
 *   description: Player management APIs
 */

/* -------------------------------------------------------------------------- */
/*                               LIST PLAYERS                                 */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /players:
 *   get:
 *     summary: List all active players
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         example: IND
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [BATSMAN, BOWLER, ALL_ROUNDER, WICKET_KEEPER]
 *     responses:
 *       200:
 *         description: Players fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Players fetched
 *               data:
 *                 - id: 65p1
 *                   name: Virat Kohli
 *                   team: IND
 *                   role: BATSMAN
 *                   credit: 10
 *                 - id: 65p2
 *                   name: Jasprit Bumrah
 *                   team: IND
 *                   role: BOWLER
 *                   credit: 9
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, listPlayers);

/* -------------------------------------------------------------------------- */
/*                               GET PLAYER                                   */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get player by ID
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65p1
 *     responses:
 *       200:
 *         description: Player fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Player fetched
 *               data:
 *                 id: 65p1
 *                 name: Virat Kohli
 *                 team: IND
 *                 role: BATSMAN
 *                 credit: 10
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Player not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getPlayer);

/* -------------------------------------------------------------------------- */
/*                               CREATE PLAYER                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /players:
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
router.post("/", authMiddleware, adminOnly, createPlayer);

/* -------------------------------------------------------------------------- */
/*                               UPDATE PLAYER                                */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /players/{id}:
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
router.put("/:id", authMiddleware, adminOnly, updatePlayer);

/* -------------------------------------------------------------------------- */
/*                              DEACTIVATE PLAYER                              */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 * /players/{id}:
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
router.delete("/:id", authMiddleware, adminOnly, deactivatePlayer);

export default router;
