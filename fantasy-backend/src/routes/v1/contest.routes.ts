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
 * tags:
 *   name: Contest
 *   description: Contest management APIs
 */

/* ================= ADMIN ================= */

/**
 * @swagger
 * /admin/contests:
 *   post:
 *     summary: Create contest (TEAM or PREDICTION)
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             matchId: 65abc111
 *             contestType: PREDICTION
 *             baseAmount: 10
 *             multiplier: 3
 *             prizePool: 500
 *             maxParticipants: 100
 *             lockTime: 2026-02-10T13:30:00Z
 *     responses:
 *       201:
 *         description: Contest created
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
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
 */
router.delete("/admin/contests/:id", authMiddleware, adminOnly, deleteContest);

/**
 * @swagger
 * /admin/contests:
 *   get:
 *     summary: List all contests (admin)
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 */
router.get("/admin/contests", authMiddleware, adminOnly, listAllContestsAdmin);


/* ================= USER / PUBLIC ================= */

/**
 * @swagger
 * /contests:
 *   get:
 *     summary: List open contests
 *     tags: [Contest]
 */
router.get("/contests", listOpenContests);

/**
 * @swagger
 * /contests/match/{matchId}:
 *   get:
 *     summary: Get contests by match
 *     tags: [Contest]
 */
router.get("/contests/match/:matchId", listContestsByMatch);

/**
 * @swagger
 * /contests/{id}:
 *   get:
 *     summary: Get contest details
 *     tags: [Contest]
 */
router.get("/contests/:id", getContest);

export default router;
