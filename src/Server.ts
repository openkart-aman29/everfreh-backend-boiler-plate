import 'dotenv/config';
import app from './App';
import { ENV } from './configurations/ENV_Configuration';
import { connectDatabase } from './database/Database_Connection_Manager';
import { createFeatureLogger } from './utilities/logger/manager/Logger_Manager';

const serverLogger = createFeatureLogger('Server');

const startServer = async () => {
    try {
        // Connect to database
        const dbConnected = await connectDatabase();
        if (!dbConnected) {
            serverLogger.error('Failed to connect to database');
            process.exit(1);
        }

        const PORT = ENV.PORT;

        app.listen(PORT, () => {
            serverLogger.info(`EverFresh Backend Server running on port ${PORT}`);
        });
    } catch (error) {
        serverLogger.error('Failed to start server', error);
        process.exit(1);
    }
};

startServer();