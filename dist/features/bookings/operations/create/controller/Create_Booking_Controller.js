"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingController = void 0;
const Booking_Logger_1 = require("../../../../../features/bookings/logger/Booking_Logger");
const Create_Booking_Zod_Schema_1 = require("../../../../../features/bookings/operations/create/zod_schema/Create_Booking_Zod_Schema");
const Standard_Response_1 = require("../../../../../utilities/http/http-response/Standard_Response");
const HTTP_Status_Codes_1 = require("../../../../../utilities/http/constants/HTTP_Status_Codes");
const Create_Booking_Service_1 = require("../../../../../features/bookings/operations/create/service/Create_Booking_Service");
const zod_1 = require("zod");
const createBookingController = async (req, res) => {
    try {
        Booking_Logger_1.bookingLogger.info('Creating booking - createBookingController');
        const body = req.body;
        // Validate with Zod
        const validationResult = Create_Booking_Zod_Schema_1.createBookingZodSchema.safeParse(body);
        if (!validationResult.success) {
            const validationErrors = validationResult.error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));
            const status = 400;
            const response = {
                success: false,
                status,
                message: 'VALIDATION_ERROR',
                code: (0, HTTP_Status_Codes_1.getErrorStatus)(status),
                data: null,
                errors: validationErrors
            };
            Booking_Logger_1.bookingLogger.error('Validation error', response);
            return (0, Standard_Response_1.sendResponse)(res, response);
        }
        // Call service
        const serviceResponse = await (0, Create_Booking_Service_1.createBookingService)(validationResult.data);
        Booking_Logger_1.bookingLogger.info('Controller response', serviceResponse);
        return (0, Standard_Response_1.sendResponse)(res, serviceResponse);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const validationErrors = error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));
            const status = 400;
            const response = {
                success: false,
                status,
                message: 'VALIDATION_ERROR',
                code: (0, HTTP_Status_Codes_1.getErrorStatus)(status),
                data: null,
                errors: validationErrors
            };
            Booking_Logger_1.bookingLogger.error('Zod error', response);
            return (0, Standard_Response_1.sendResponse)(res, response);
        }
        const status = 500;
        const response = {
            success: false,
            message: 'INTERNAL_SERVER_ERROR',
            status,
            code: (0, HTTP_Status_Codes_1.getErrorStatus)(status),
            data: null,
            errors: [{ field: 'SERVER_ERROR', message: 'Internal server error' }],
        };
        Booking_Logger_1.bookingLogger.error('Error in controller', response);
        return (0, Standard_Response_1.sendResponse)(res, response);
    }
};
exports.createBookingController = createBookingController;
