import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/admin.middleware";

import {
  createContest,
  updateContest,
  deleteContest,
  listAllContestsAdmin,
  listOpenContests,
  listContestsByMatch,
  getContest
} from "../../controllers/contest.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Contest:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65abc111
 *         matchId:
 *           type: string
 *           example: 65match999
 *         contestType:
 *           type: string
 *           enum: [TEAM, PREDICTION]
 *           example: PREDICTION
 *         baseAmount:
 *           type: number
 *           example: 10
 *         multiplier:
 *           type: number
 *           example: 3
 *         prizePool:
 *           type: number
 *           example: 500
 *         maxParticipants:
 *           type: number
 *           example: 100
 *         joinedParticipants:
 *           type: number
 *           example: 20
 *         lockTime:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [OPEN, LOCKED, COMPLETED]
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Something went wrong
 */

/**
 * @swagger
 * tags:
 *   name: Contest
 *   description: Contest management APIs
 */

/* ================= ADMIN ================= */

/**
 * @swagger
 * /admin/contests:
 *   post:
 *     summary: Create a contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       201:
 *         description: Contest created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       500:
 *         description: Internal server error
 */
router.post("/admin/contests", authMiddleware, adminOnly, createContest);

/**
 * @swagger
 * /admin/contests/{id}:
 *   put:
 *     summary: Update contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       200:
 *         description: Contest updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Contest not found
 *       500:
 *         description: Server error
 */
router.put("/admin/contests/:id", authMiddleware, adminOnly, updateContest);

/**
 * @swagger
 * /admin/contests/{id}:
 *   delete:
 *     summary: Delete contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Contest not found
 *       500:
 *         description: Server error
 */
router.delete("/admin/contests/:id", authMiddleware, adminOnly, deleteContest);

/**
 * @swagger
 * /admin/contests:
 *   get:
 *     summary: List all contests (Admin)
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contest'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       500:
 *         description: Server error
 */
router.get("/admin/contests", authMiddleware, adminOnly, listAllContestsAdmin);

/* ================= USER / PUBLIC ================= */

/**
 * @swagger
 * /contests:
 *   get:
 *     summary: List open contests
 *     tags: [Contest]
 *     responses:
 *       200:
 *         description: Open contests list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contest'
 *       500:
 *         description: Server error
 */
router.get("/contests", listOpenContests);

/**
 * @swagger
 * /contests/match/{matchId}:
 *   get:
 *     summary: Get contests by match ID
 *     tags: [Contest]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contests for a match
 *       404:
 *         description: No contests found
 *       500:
 *         description: Server error
 */
router.get("/contests/match/:matchId", listContestsByMatch);

/**
 * @swagger
 * /contests/{id}:
 *   get:
 *     summary: Get contest details
 *     tags: [Contest]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       404:
 *         description: Contest not found
 *       500:
 *         description: Server error
 */
router.get("/contests/:id", getContest);

export default router;
