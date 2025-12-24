"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const envalid_1 = require("envalid");
exports.ENV = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)({ choices: ['development', 'production', 'test'] }),
    PORT: (0, envalid_1.port)({ default: 5000 }),
    // Database
    DB_HOST: (0, envalid_1.str)(),
    DB_PORT: (0, envalid_1.port)({ default: 5432 }),
    DB_NAME: (0, envalid_1.str)(),
    DB_USER: (0, envalid_1.str)(),
    DB_PASSWORD: (0, envalid_1.str)(),
    // JWT
    JWT_ACCESS_TOKEN_EXPIRATION: (0, envalid_1.num)({ default: 900 }), // 15 minutes
    JWT_REFRESH_TOKEN_EXPIRATION: (0, envalid_1.num)({ default: 604800 }), // 7 days
    JWT_PRIVATE_KEY_PATH: (0, envalid_1.str)({ default: './rsa-keys/private.pem' }),
    JWT_PUBLIC_KEY_PATH: (0, envalid_1.str)({ default: './rsa-keys/public.pem' }),
    // Security
    ALLOWED_ORIGINS: (0, envalid_1.str)({ default: 'http://localhost:3000' }),
    RATE_LIMIT_WINDOW_MS: (0, envalid_1.num)({ default: 600000 }), // 10 minutes
    RATE_LIMIT_MAX_REQUESTS: (0, envalid_1.num)({ default: 10000 }),
    // Argon2
    ARGON2_MEMORY_COST: (0, envalid_1.num)({ default: 65536 }),
    ARGON2_TIME_COST: (0, envalid_1.num)({ default: 3 }),
    ARGON2_PARALLELISM: (0, envalid_1.num)({ default: 2 }),
});
