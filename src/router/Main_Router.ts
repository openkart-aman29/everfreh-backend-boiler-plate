import { Router } from 'express';
import bookingRouter from '@/features/bookings/router/Booking_Router';
// import companyRouter from '@/features/companies/router/Company_Router';
// import serviceRouter from '@/features/services/router/Service_Router';
// import customerRouter from '@/features/customers/router/Customer_Router';
// import staffRouter from '@/features/staff/router/Staff_Router';
// import paymentRouter from '@/features/payments/router/Payment_Router';

const mainRouter = Router();

// Feature routes
mainRouter.use('/bookings', bookingRouter);
// mainRouter.use('/companies', companyRouter);
// mainRouter.use('/services', serviceRouter);
// mainRouter.use('/customers', customerRouter);
// mainRouter.use('/staff', staffRouter);
// mainRouter.use('/payments', paymentRouter);

export default mainRouter;