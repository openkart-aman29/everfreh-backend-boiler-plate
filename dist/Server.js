"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const App_1 = __importDefault(require("./App"));
const ENV_Configuration_1 = require("./configurations/ENV_Configuration");
const Database_Connection_Manager_1 = require("./database/Database_Connection_Manager");
const Logger_Manager_1 = require("./utilities/logger/manager/Logger_Manager");
const serverLogger = (0, Logger_Manager_1.createFeatureLogger)('Server');
const startServer = async () => {
    try {
        // Connect to database
        const dbConnected = await (0, Database_Connection_Manager_1.connectDatabase)();
        if (!dbConnected) {
            serverLogger.error('Failed to connect to database');
            process.exit(1);
        }
        const PORT = ENV_Configuration_1.ENV.PORT;
        App_1.default.listen(PORT, () => {
            serverLogger.info(`EverFresh Backend Server running on port ${PORT}`);
        });
    }
    catch (error) {
        serverLogger.error('Failed to start server', error);
        process.exit(1);
    }
};
startServer();
