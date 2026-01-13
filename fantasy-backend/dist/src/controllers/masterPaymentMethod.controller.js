"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivatePaymentMethod = exports.updatePaymentMethod = exports.createPaymentMethod = exports.listPaymentMethods = void 0;
const masterPaymentMethod_service_1 = require("../services/masterPaymentMethod.service");
const masterPaymentMethod_mapper_1 = require("../mappers/masterPaymentMethod.mapper");
const apiResponse_1 = require("../utils/apiResponse");
/* -------- PUBLIC -------- */
const listPaymentMethods = async (req, res) => {
    try {
        const methods = await masterPaymentMethod_service_1.MasterPaymentMethodService.listActive(req.query.type);
        return (0, apiResponse_1.success)(res, methods.map(masterPaymentMethod_mapper_1.mapMasterPaymentMethod), "Payment methods fetched");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 500);
    }
};
exports.listPaymentMethods = listPaymentMethods;
/* -------- ADMIN -------- */
const createPaymentMethod = async (req, res) => {
    try {
        const method = await masterPaymentMethod_service_1.MasterPaymentMethodService.create(req.body);
        return (0, apiResponse_1.success)(res, (0, masterPaymentMethod_mapper_1.mapMasterPaymentMethod)(method), "Payment method created", 201);
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.createPaymentMethod = createPaymentMethod;
const updatePaymentMethod = async (req, res) => {
    try {
        const method = await masterPaymentMethod_service_1.MasterPaymentMethodService.update(req.params.id, req.body);
        return (0, apiResponse_1.success)(res, (0, masterPaymentMethod_mapper_1.mapMasterPaymentMethod)(method), "Payment method updated");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.updatePaymentMethod = updatePaymentMethod;
const deactivatePaymentMethod = async (req, res) => {
    try {
        const method = await masterPaymentMethod_service_1.MasterPaymentMethodService.deactivate(req.params.id);
        return (0, apiResponse_1.success)(res, (0, masterPaymentMethod_mapper_1.mapMasterPaymentMethod)(method), "Payment method deactivated");
    }
    catch (e) {
        return (0, apiResponse_1.error)(res, e.message, 400);
    }
};
exports.deactivatePaymentMethod = deactivatePaymentMethod;
