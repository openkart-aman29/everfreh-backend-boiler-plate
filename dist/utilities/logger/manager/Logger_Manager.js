"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeatureLogger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, printf, errors } = winston_1.format;
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}] ${message}`;
    if (Object.keys(meta).length > 0) {
        log += ` | Meta: ${JSON.stringify(meta)}`;
    }
    if (stack) {
        log += `\n${stack}`;
    }
    return log;
});
const createFeatureLogger = (featureName) => {
    return (0, winston_1.createLogger)({
        level: 'info',
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
        transports: [
            new winston_1.transports.Console({
                level: 'debug',
                silent: process.env.NODE_ENV === 'production'
            }),
            new winston_daily_rotate_file_1.default({
                filename: `logs/%DATE%/${featureName}/${featureName}.log.%DATE%`,
                datePattern: 'YYYY-MM-DD',
                maxSize: '20m',
                maxFiles: '30d',
                level: 'info'
            }),
            new winston_daily_rotate_file_1.default({
                filename: `logs/%DATE%/${featureName}/${featureName}-error.log.%DATE%`,
                datePattern: 'YYYY-MM-DD',
                maxSize: '20m',
                maxFiles: '30d',
                level: 'error'
            })
        ]
    });
};
exports.createFeatureLogger = createFeatureLogger;
