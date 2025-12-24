import { BaseBookingDAO } from '@/features/bookings/database/dao/Base_Booking_DAO';
import { BookingInterface } from '@/features/bookings/interface/Booking_Interface';

class CreateBookingDAO extends BaseBookingDAO {
    async createBooking(
        bookingData: BookingInterface
    ): Promise<{ success: boolean; booking?: BookingInterface | null }> {
        try {
            const pool = this.getPool();
            if (!pool) {
                return { success: false };
            }

            const query = `
                INSERT INTO bookings (
                    booking_id, company_id, customer_id, service_id, staff_id,
                    booking_number, status, scheduled_date, scheduled_time_start,
                    scheduled_time_end, service_location, total_amount,
                    created_at, updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                RETURNING *
            `;

            const values = [
                bookingData.booking_id,
                bookingData.company_id,
                bookingData.customer_id,
                bookingData.service_id,
                bookingData.staff_id,
                bookingData.booking_number,
                bookingData.status,
                bookingData.scheduled_date,
                bookingData.scheduled_time_start,
                bookingData.scheduled_time_end,
                bookingData.service_location,
                bookingData.total_amount,
                bookingData.created_at,
                bookingData.updated_at
            ];

            const result = await pool.query(query, values);

            if (result.rows.length === 0) {
                this.logError('createBooking', 'No rows returned');
                return { success: false };
            }

            return {
                success: true,
                booking: result.rows[0]
            };

        } catch (error) {
            this.logError('createBooking', error);
            return { success: false };
        }
    }
}

export async function createBookingDAO(
    bookingData: BookingInterface
): Promise<{ success: boolean; booking?: BookingInterface | null }> {
    const dao = new CreateBookingDAO();
    return dao.createBooking(bookingData);
}