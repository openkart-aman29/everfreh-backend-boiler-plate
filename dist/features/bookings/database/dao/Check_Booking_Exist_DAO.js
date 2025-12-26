"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookingExistDAO = checkBookingExistDAO;
const Base_Booking_DAO_1 = require("../../../../features/bookings/database/dao/Base_Booking_DAO");
class CheckBookingExistDAO extends Base_Booking_DAO_1.BaseBookingDAO {
    async checkBookingExist(booking_id) {
        try {
            const pool = this.getPool();
            if (!pool) {
                return { exists: false };
            }
            const query = `
                SELECT booking_id FROM bookings
                WHERE booking_id = $1 AND deleted_at IS NULL
                LIMIT 1
            `;
            const result = await pool.query(query, [booking_id]);
            return { exists: result.rows.length > 0 };
        }
        catch (error) {
            this.logError('checkBookingExist', error);
            return { exists: false };
        }
    }
}
async function checkBookingExistDAO(booking_id) {
    const dao = new CheckBookingExistDAO();
    return dao.checkBookingExist(booking_id);
}
