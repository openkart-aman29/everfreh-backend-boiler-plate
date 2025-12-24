"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const ENV_Configuration_1 = require("./configurations/ENV_Configuration");
const Main_Router_1 = __importDefault(require("./router/Main_Router"));
const Logger_Manager_1 = require("./utilities/logger/manager/Logger_Manager");
const appLogger = (0, Logger_Manager_1.createFeatureLogger)('App');
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
// CORS configuration
const corsOptions = {
    origin: ENV_Configuration_1.ENV.ALLOWED_ORIGINS.split(','),
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: ENV_Configuration_1.ENV.RATE_LIMIT_WINDOW_MS,
    max: ENV_Configuration_1.ENV.RATE_LIMIT_MAX_REQUESTS,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// Body parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
// API routes
app.use('/api/v1', Main_Router_1.default);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        status: 404,
        code: 'NOT_FOUND',
        data: null,
        errors: []
    });
});
// Global error handler
app.use((err, req, res, next) => {
    appLogger.error('Unhandled error', err);
    const status = err.status || 500;
    const message = ENV_Configuration_1.ENV.NODE_ENV === 'production' ? 'Internal server error' : err.message;
    res.status(status).json({
        success: false,
        message,
        status,
        code: 'INTERNAL_ERROR',
        data: null,
        errors: ENV_Configuration_1.ENV.NODE_ENV === 'development' ? [{ field: 'error', message: err.stack }] : []
    });
});
exports.default = app;
