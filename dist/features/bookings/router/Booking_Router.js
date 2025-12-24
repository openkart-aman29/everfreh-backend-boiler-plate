"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Create_Booking_Controller_1 = require("../operations/create/controller/Create_Booking_Controller");
// import { readBookingController } from '../operations/read/controller/Read_Booking_Controller';
// import { readAllBookingsController } from '../operations/read_all/controller/Read_All_Bookings_Controller';
// import { updateBookingController } from '../operations/update/controller/Update_Booking_Controller';
// import { cancelBookingController } from '../operations/cancel/controller/Cancel_Booking_Controller';
const JWT_Verification_Middleware_1 = require("../../../modules/auth/middleware/JWT_Verification_Middleware");
const Rate_Limit_Middleware_1 = require("../../../utilities/middleware/Rate_Limit_Middleware");
const bookingRouter = (0, express_1.Router)();
// Apply rate limiting to all routes
bookingRouter.use(Rate_Limit_Middleware_1.rateLimitMiddleware);
// Create booking
bookingRouter.post('/create', JWT_Verification_Middleware_1.accessTokenVerificationMiddleware, Create_Booking_Controller_1.createBookingController);
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
exports.default = bookingRouter;
