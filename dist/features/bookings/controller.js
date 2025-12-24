"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const service_1 = require("./service");
const logger_1 = require("../../config/logger");
class BookingController {
    service = new service_1.BookingService();
    async create = async (req, res) => {
        try {
            const booking = await this.service.createBooking(req.body);
            res.status(201).json(booking);
        }
        catch (error) {
            logger_1.logger.error('Error creating booking', error);
            res.status(400).json({ error: error.message });
        }
    };
    async getById = async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await this.service.getBookingById(id);
            if (!booking) {
                res.status(404).json({ error: 'Booking not found' });
                return;
            }
            res.json(booking);
        }
        catch (error) {
            logger_1.logger.error('Error getting booking by id', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    async getAll = async (req, res) => {
        try {
            const bookings = await this.service.getAllBookings();
            res.json(bookings);
        }
        catch (error) {
            logger_1.logger.error('Error getting all bookings', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    async update = async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await this.service.updateBooking(id, req.body);
            if (!booking) {
                res.status(404).json({ error: 'Booking not found' });
                return;
            }
            res.json(booking);
        }
        catch (error) {
            logger_1.logger.error('Error updating booking', error);
            res.status(400).json({ error: error.message });
        }
    };
    async delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await this.service.deleteBooking(id);
            if (!deleted) {
                res.status(404).json({ error: 'Booking not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            logger_1.logger.error('Error deleting booking', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}
exports.BookingController = BookingController;
