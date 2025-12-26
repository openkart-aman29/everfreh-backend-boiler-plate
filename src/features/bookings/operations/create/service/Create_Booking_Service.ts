import { bookingLogger } from '@/features/bookings/logger/Booking_Logger';
import { StandardResponseInterface } from '@/utilities/global_interfaces/Standard_Response_Interface';
import { getErrorStatus } from '@/utilities/http/constants/HTTP_Status_Codes';
import { generateULID } from '@/utilities/id_generator/ULID_Generator';
// import { checkCustomerExistDAO } from '@/features/customers/database/dao/Check_Customer_Exist_DAO';
// import { checkServiceExistDAO } from '@/features/services/database/dao/Check_Service_Exist_DAO';
import { createBookingDAO } from '@/features/bookings/operations/create/dao/Create_Booking_DAO';
import { BookingInterface } from '@/features/bookings/interface/Booking_Interface';

interface CreateBookingServiceInput {
    company_id: string;
    customer_id: string;
    service_id: string;
    staff_id?: string | null;
    scheduled_date: Date;
    scheduled_time_start: string;
    scheduled_time_end?: string | null;
    service_location: string;
    total_amount: number;
}

export const createBookingService = async (
    newData: CreateBookingServiceInput
): Promise<StandardResponseInterface<BookingInterface | null>> => {
    try {
        bookingLogger.info('Creating booking - service', {
            customer_id: newData.customer_id,
            service_id: newData.service_id
        });

        // 1. Check if customer exists
        // const customerExists = await checkCustomerExistDAO(newData.customer_id);
        // if (!customerExists.exists) {
        //     const status = 404;
        //     return {
        //         success: false,
        //         message: 'CUSTOMER_NOT_FOUND',
        //         status,
        //         code: getErrorStatus(status),
        //         data: null,
        //         errors: [{ field: 'customer_id', message: 'Customer not found' }],
        //     };
        // }

        // 2. Check if service exists
        // const serviceExists = await checkServiceExistDAO(newData.service_id);
        // if (!serviceExists.exists) {
        //     const status = 404;
        //     return {
        //         success: false,
        //         message: 'SERVICE_NOT_FOUND',
        //         status,
        //         code: getErrorStatus(status),
        //         data: null,
        //         errors: [{ field: 'service_id', message: 'Service not found' }],
        //     };
        // }

        // 3. Check if service is available (business logic)
        // TODO: Implement service availability check

        // 4. Check staff availability if assigned
        if (newData.staff_id) {
            // TODO: Check staff availability
        }

        // 5. Generate booking number
        // TODO: Implement booking number generation

        // 6. Prepare booking data
        const bookingData: BookingInterface = {
            booking_id: generateULID(),
            ...newData,
            staff_id: newData.staff_id || null,
            scheduled_time_end: newData.scheduled_time_end || null,
            booking_number: 'TEMP-' + generateULID(), // Temporary
            status: 'pending',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        // 7. Create booking in database
        const createResult = await createBookingDAO(bookingData);

        if (!createResult.success) {
            const status = 500;
            return {
                success: false,
                message: 'BOOKING_CREATION_FAILED',
                status,
                code: getErrorStatus(status),
                data: null,
                errors: [{ field: 'database', message: 'Failed to create booking' }],
            };
        }

        // 8. Success response
        const status = 201;
        return {
            success: true,
            message: 'BOOKING_CREATED_SUCCESSFULLY',
            status,
            code: getErrorStatus(status),
            data: createResult.booking!,
            errors: [],
        };

    } catch (error) {
        bookingLogger.error('Error in service', error);

        const status = 500;
        return {
            success: false,
            message: 'INTERNAL_SERVER_ERROR',
            status,
            code: getErrorStatus(status),
            data: null,
            errors: [{ field: 'server', message: 'Internal server error' }],
        };
    }
};