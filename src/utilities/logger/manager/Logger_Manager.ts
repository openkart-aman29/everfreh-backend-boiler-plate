import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, errors } = format;

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

export const createFeatureLogger = (featureName: string) => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console({
                level: 'debug',
                silent: process.env.NODE_ENV === 'production'
            }),
            new DailyRotateFile({
                filename: `logs/%DATE%/${featureName}/${featureName}.log.%DATE%`,
                datePattern: 'YYYY-MM-DD',
                maxSize: '20m',
                maxFiles: '30d',
                level: 'info'
            }),
            new DailyRotateFile({
                filename: `logs/%DATE%/${featureName}/${featureName}-error.log.%DATE%`,
                datePattern: 'YYYY-MM-DD',
                maxSize: '20m',
                maxFiles: '30d',
                level: 'error'
            })
        ]
    });
};