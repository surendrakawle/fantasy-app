"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const User_model_1 = require("../models/User.model");
const getMe = async (req, res) => {
    const user = await User_model_1.User.findById(req.user.userId).select("-googleId");
    res.json(user);
};
exports.getMe = getMe;
