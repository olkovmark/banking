"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const auth_1 = require("./auth");
const balance_1 = require("./balance");
const authMiddleware_1 = require("../middleware/authMiddleware");
const user_1 = require("./user");
exports.router = express.Router();
exports.router.use(auth_1.AuthRouter);
exports.router.use(authMiddleware_1.authMiddleware, balance_1.BalanceRouter);
exports.router.use(authMiddleware_1.authMiddleware, user_1.UserRouter);