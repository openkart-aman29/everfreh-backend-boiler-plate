"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.getDatabase = exports.connectDatabase = void 0;
const pg_1 = require("pg");
const ENV_Configuration_1 = require("../configurations/ENV_Configuration");
const Logger_Manager_1 = require("../utilities/logger/manager/Logger_Manager");
const databaseLogger = (0, Logger_Manager_1.createFeatureLogger)('Database');
let pool = null;
const connectDatabase = async () => {
    try {
        pool = new pg_1.Pool({
            host: ENV_Configuration_1.ENV.DB_HOST,
            port: ENV_Configuration_1.ENV.DB_PORT,
            database: ENV_Configuration_1.ENV.DB_NAME,
            user: ENV_Configuration_1.ENV.DB_USER,
            password: ENV_Configuration_1.ENV.DB_PASSWORD,
            max: 20, // Maximum pool size
            min: 3, // Minimum pool size
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        });
        // Test connection
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        client.release();
        databaseLogger.info('PostgreSQL connected successfully');
        return true;
    }
    catch (error) {
        databaseLogger.error('PostgreSQL connection failed', error);
        return false;
    }
};
exports.connectDatabase = connectDatabase;
const getDatabase = () => {
    if (!pool) {
        databaseLogger.error('Database pool not initialized');
        return null;
    }
    return pool;
};
exports.getDatabase = getDatabase;
const closeDatabase = async () => {
    if (pool) {
        await pool.end();
        pool = null;
        databaseLogger.info('Database connection closed');
    }
};
exports.closeDatabase = closeDatabase;
