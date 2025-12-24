import { cleanEnv, str, num, port } from 'envalid';

export const ENV = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 5000 }),

    // Database
    DB_HOST: str(),
    DB_PORT: port({ default: 5432 }),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),

    // JWT
    JWT_ACCESS_TOKEN_EXPIRATION: num({ default: 900 }),     // 15 minutes
    JWT_REFRESH_TOKEN_EXPIRATION: num({ default: 604800 }), // 7 days
    JWT_PRIVATE_KEY_PATH: str({ default: './rsa-keys/private.pem' }),
    JWT_PUBLIC_KEY_PATH: str({ default: './rsa-keys/public.pem' }),

    // Security
    ALLOWED_ORIGINS: str({ default: 'http://localhost:3000' }),
    RATE_LIMIT_WINDOW_MS: num({ default: 600000 }),         // 10 minutes
    RATE_LIMIT_MAX_REQUESTS: num({ default: 10000 }),

    // Argon2
    ARGON2_MEMORY_COST: num({ default: 65536 }),
    ARGON2_TIME_COST: num({ default: 3 }),
    ARGON2_PARALLELISM: num({ default: 2 }),
});