"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const dao_1 = require("./dao");
const validation_1 = require("./validation");
const logger_1 = require("../../config/logger");
class BookingService {
    dao = new dao_1.BookingDAO();
    async createBooking(data) {
        const validatedData = validation_1.CreateBookingSchema.parse(data);
        logger_1.logger.info('Creating booking', { data: validatedData });
        return await this.dao.create(validatedData);
    }
    async getBookingById(id) {
        logger_1.logger.info('Getting booking by id', { id });
        return await this.dao.findById(id);
    }
    async getAllBookings() {
        logger_1.logger.info('Getting all bookings');
        return await this.dao.findAll();
    }
    async updateBooking(id, data) {
        const validatedData = validation_1.UpdateBookingSchema.parse(data);
        logger_1.logger.info('Updating booking', { id, data: validatedData });
        return await this.dao.update(id, validatedData);
    }
    async deleteBooking(id) {
        logger_1.logger.info('Deleting booking', { id });
        return await this.dao.delete(id);
    }
}
exports.BookingService = BookingService;
