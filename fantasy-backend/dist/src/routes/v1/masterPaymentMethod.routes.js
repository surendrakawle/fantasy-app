"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const masterPaymentMethod_controller_1 = require("../../controllers/masterPaymentMethod.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const admin_middleware_1 = require("../../middlewares/admin.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Master Payment Methods
 *   description: Master Bank & UPI configuration
 */
/**
 * @swagger
 * /payment-methods:
 *   get:
 *     summary: Get active bank / UPI payment methods
 *     tags: [Master Payment Methods]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [BANK, UPI]
 *         example: UPI
 *     responses:
 *       200:
 *         description: Payment methods fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 65pm1
 *                   type: UPI
 *                   label: Primary UPI
 *                   upi:
 *                     upiId: company@upi
 *                     holderName: Company Pvt Ltd
 *       500:
 *         description: Server error
 */
router.get("/", masterPaymentMethod_controller_1.listPaymentMethods);
/**
 * @swagger
 * /payment-methods:
 *   post:
 *     summary: Create master bank / UPI (Admin)
 *     tags: [Master Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             type: BANK
 *             label: HDFC Main Account
 *             bankName: HDFC
 *             accountName: Company Pvt Ltd
 *             accountNumber: "1234567890"
 *             ifsc: HDFC0001234
 *     responses:
 *       201:
 *         description: Payment method created
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.post("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminOnly, masterPaymentMethod_controller_1.createPaymentMethod);
/**
 * @swagger
 * /admin/payment-methods/{id}:
 *   put:
 *     summary: Update master bank / UPI (Admin)
 *     tags: [Master Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65pm1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             isActive: false
 *     responses:
 *       200:
 *         description: Payment method updated
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.put("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminOnly, masterPaymentMethod_controller_1.updatePaymentMethod);
/**
 * @swagger
 * /admin/payment-methods/{id}:
 *   delete:
 *     summary: Deactivate payment method (Admin)
 *     tags: [Master Payment Methods]
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
 *         description: Payment method deactivated
 *       400:
 *         description: Invalid ID
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminOnly, masterPaymentMethod_controller_1.deactivatePaymentMethod);
exports.default = router;
