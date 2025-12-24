import { Pool } from 'pg';
import { getDatabase } from '@/database/Database_Connection_Manager';
import { bookingLogger } from '../../logger/Booking_Logger';

export abstract class BaseBookingDAO {
    protected getPool(): Pool | null {
        try {
            const pool = getDatabase();
            if (!pool) {
                bookingLogger.error('Database pool not available');
                return null;
            }
            return pool;
        } catch (error) {
            bookingLogger.error(`Error getting database pool: ${error}`);
            return null;
        }
    }

    protected logError(operation: string, error: any): void {
        bookingLogger.error(`Error in ${operation}: ${error}`);
    }
}