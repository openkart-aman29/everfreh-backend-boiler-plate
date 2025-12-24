"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Booking_Router_1 = __importDefault(require("../features/bookings/router/Booking_Router"));
// import companyRouter from '../features/companies/router/Company_Router';
// import serviceRouter from '../features/services/router/Service_Router';
// import customerRouter from '../features/customers/router/Customer_Router';
// import staffRouter from '../features/staff/router/Staff_Router';
// import paymentRouter from '../features/payments/router/Payment_Router';
const mainRouter = (0, express_1.Router)();
// Feature routes
mainRouter.use('/bookings', Booking_Router_1.default);
// mainRouter.use('/companies', companyRouter);
// mainRouter.use('/services', serviceRouter);
// mainRouter.use('/customers', customerRouter);
// mainRouter.use('/staff', staffRouter);
// mainRouter.use('/payments', paymentRouter);
exports.default = mainRouter;
