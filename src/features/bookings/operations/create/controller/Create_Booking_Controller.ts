import { Request, Response } from 'express';
import { bookingLogger } from '@/features/bookings/logger/Booking_Logger';
import { createBookingZodSchema } from '../zod_schema/Create_Booking_Zod_Schema';
import { sendResponse } from '@/utilities/http/http-response/Standard_Response';
import { StandardResponseInterface } from '@/utilities/global_interfaces/Standard_Response_Interface';
import { getErrorStatus } from '@/utilities/http/constants/HTTP_Status_Codes';
import { createBookingService } from '../service/Create_Booking_Service';
import { ZodError } from 'zod';

export const createBookingController = async (req: Request, res: Response) => {
    try {
        bookingLogger.info('Creating booking - createBookingController');

        const body = req.body;

        // Validate with Zod
        const validationResult = createBookingZodSchema.safeParse(body);

        if (!validationResult.success) {
            const validationErrors = validationResult.error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));

            const status = 400;
            const response: StandardResponseInterface<null> = {
                success: false,
                status,
                message: 'VALIDATION_ERROR',
                code: getErrorStatus(status),
                data: null,
                errors: validationErrors
            };

            bookingLogger.error('Validation error', response);
            return sendResponse(res, response);
        }

        // Call service
        const serviceResponse = await createBookingService(validationResult.data);

        bookingLogger.info('Controller response', serviceResponse);
        return sendResponse(res, serviceResponse);

    } catch (error) {
        if (error instanceof ZodError) {
            const validationErrors = error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));

            const status = 400;
            const response: StandardResponseInterface<null> = {
                success: false,
                status,
                message: 'VALIDATION_ERROR',
                code: getErrorStatus(status),
                data: null,
                errors: validationErrors
            };

            bookingLogger.error('Zod error', response);
            return sendResponse(res, response);
        }

        const status = 500;
        const response: StandardResponseInterface<null> = {
            success: false,
            message: 'INTERNAL_SERVER_ERROR',
            status,
            code: getErrorStatus(status),
            data: null,
            errors: [{ field: 'SERVER_ERROR', message: 'Internal server error' }],
        };

        bookingLogger.error('Error in controller', response);
        return sendResponse(res, response);
    }
};