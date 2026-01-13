"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            ...req.body,
            ...req.params
        });
        next();
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: e.errors
        });
    }
};
exports.validate = validate;
