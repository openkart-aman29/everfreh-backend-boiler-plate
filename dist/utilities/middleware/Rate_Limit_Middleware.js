"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const ENV_Configuration_1 = require("../../configurations/ENV_Configuration");
exports.rateLimitMiddleware = (0, express_rate_limit_1.default)({
    windowMs: ENV_Configuration_1.ENV.RATE_LIMIT_WINDOW_MS,
    max: ENV_Configuration_1.ENV.RATE_LIMIT_MAX_REQUESTS,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
