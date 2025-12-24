"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBookingDAO = void 0;
const Database_Connection_Manager_1 = require("../../../../database/Database_Connection_Manager");
const Booking_Logger_1 = require("../../logger/Booking_Logger");
class BaseBookingDAO {
    getPool() {
        try {
            const pool = (0, Database_Connection_Manager_1.getDatabase)();
            if (!pool) {
                Booking_Logger_1.bookingLogger.error('Database pool not available');
                return null;
            }
            return pool;
        }
        catch (error) {
            Booking_Logger_1.bookingLogger.error(`Error getting database pool: ${error}`);
            return null;
        }
    }
    logError(operation, error) {
        Booking_Logger_1.bookingLogger.error(`Error in ${operation}: ${error}`);
    }
}
exports.BaseBookingDAO = BaseBookingDAO;
