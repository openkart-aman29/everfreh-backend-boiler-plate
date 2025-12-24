"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDAO = void 0;
const ulid_1 = require("ulid");
const database_1 = require("../../config/database");
const logger_1 = require("../../config/logger");
class BookingDAO {
    async create(bookingData) {
        const id = (0, ulid_1.ulid)();
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const query = `
      INSERT INTO bookings (id, user_id, service_type, booking_date, status, notes, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
        const values = [
            id,
            bookingData.userId,
            bookingData.serviceType,
            bookingData.bookingDate,
            bookingData.status,
            bookingData.notes || null,
            createdAt,
            updatedAt,
        ];
        try {
            const result = await database_1.pool.query(query, values);
            const row = result.rows[0];
            return {
                id: row.id,
                userId: row.user_id,
                serviceType: row.service_type,
                bookingDate: row.booking_date,
                status: row.status,
                notes: row.notes,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
            };
        }
        catch (error) {
            logger_1.logger.error('Error creating booking', error);
            throw error;
        }
    }
    async findById(id) {
        const query = 'SELECT * FROM bookings WHERE id = $1';
        try {
            const result = await database_1.pool.query(query, [id]);
            if (result.rows.length === 0)
                return null;
            const row = result.rows[0];
            return {
                id: row.id,
                userId: row.user_id,
                serviceType: row.service_type,
                bookingDate: row.booking_date,
                status: row.status,
                notes: row.notes,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
            };
        }
        catch (error) {
            logger_1.logger.error('Error finding booking by id', error);
            throw error;
        }
    }
    async findAll() {
        const query = 'SELECT * FROM bookings ORDER BY created_at DESC';
        try {
            const result = await database_1.pool.query(query);
            return result.rows.map(row => ({
                id: row.id,
                userId: row.user_id,
                serviceType: row.service_type,
                bookingDate: row.booking_date,
                status: row.status,
                notes: row.notes,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
            }));
        }
        catch (error) {
            logger_1.logger.error('Error finding all bookings', error);
            throw error;
        }
    }
    async update(id, updates) {
        const updatedAt = new Date().toISOString();
        const fields = [];
        const values = [];
        let paramIndex = 1;
        if (updates.userId !== undefined) {
            fields.push(`user_id = $${paramIndex++}`);
            values.push(updates.userId);
        }
        if (updates.serviceType !== undefined) {
            fields.push(`service_type = $${paramIndex++}`);
            values.push(updates.serviceType);
        }
        if (updates.bookingDate !== undefined) {
            fields.push(`booking_date = $${paramIndex++}`);
            values.push(updates.bookingDate);
        }
        if (updates.status !== undefined) {
            fields.push(`status = $${paramIndex++}`);
            values.push(updates.status);
        }
        if (updates.notes !== undefined) {
            fields.push(`notes = $${paramIndex++}`);
            values.push(updates.notes);
        }
        fields.push(`updated_at = $${paramIndex++}`);
        values.push(updatedAt);
        const query = `UPDATE bookings SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
        values.push(id);
        try {
            const result = await database_1.pool.query(query, values);
            if (result.rows.length === 0)
                return null;
            const row = result.rows[0];
            return {
                id: row.id,
                userId: row.user_id,
                serviceType: row.service_type,
                bookingDate: row.booking_date,
                status: row.status,
                notes: row.notes,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
            };
        }
        catch (error) {
            logger_1.logger.error('Error updating booking', error);
            throw error;
        }
    }
    async delete(id) {
        const query = 'DELETE FROM bookings WHERE id = $1';
        try {
            const result = await database_1.pool.query(query, [id]);
            return result.rowCount > 0;
        }
        catch (error) {
            logger_1.logger.error('Error deleting booking', error);
            throw error;
        }
    }
}
exports.BookingDAO = BookingDAO;
