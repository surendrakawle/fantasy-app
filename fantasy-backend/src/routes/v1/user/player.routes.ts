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
router.get("/players", authMiddleware, listPlayers);

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
router.get("/players/:id", authMiddleware, getPlayer);

export default router;
