import { Router } from 'express';
import { createBookingController } from '@/features/bookings/operations/create/controller/Create_Booking_Controller';
// import { readBookingController } from '@/features/bookings/operations/read/controller/Read_Booking_Controller';
// import { readAllBookingsController } from '@/features/bookings/operations/read_all/controller/Read_All_Bookings_Controller';
// import { updateBookingController } from '@/features/bookings/operations/update/controller/Update_Booking_Controller';
// import { cancelBookingController } from '@/features/bookings/operations/cancel/controller/Cancel_Booking_Controller';
import { accessTokenVerificationMiddleware } from '@/modules/auth/middleware/JWT_Verification_Middleware';
import { rateLimitMiddleware } from '@/utilities/middleware/Rate_Limit_Middleware';

const bookingRouter = Router();

// Apply rate limiting to all routes
bookingRouter.use(rateLimitMiddleware);

// Create booking
bookingRouter.post('/create',
    accessTokenVerificationMiddleware,
    createBookingController
);

// Read all bookings (with pagination)
// bookingRouter.get('/read-all',
//     accessTokenVerificationMiddleware,
//     readAllBookingsController
// );

// Read single booking
// bookingRouter.get('/read/:booking_id',
//     accessTokenVerificationMiddleware,
//     readBookingController
// );

// Update booking
// bookingRouter.patch('/update/:booking_id',
//     accessTokenVerificationMiddleware,
//     updateBookingController
// );

// Cancel booking
// bookingRouter.post('/cancel/:booking_id',
//     accessTokenVerificationMiddleware,
//     cancelBookingController
// );

export default bookingRouter;