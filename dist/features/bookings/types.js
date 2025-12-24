"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingSchema = exports.CreateBookingSchema = exports.BookingSchema = void 0;
const zod_1 = require("zod");
exports.BookingSchema = zod_1.z.object({
    id: zod_1.z.string().ulid(),
    userId: zod_1.z.string().ulid(),
    serviceType: zod_1.z.string().min(1),
    bookingDate: zod_1.z.string().datetime(),
    status: zod_1.z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
    notes: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.CreateBookingSchema = exports.BookingSchema.omit({ id, createdAt, updatedAt });
exports.UpdateBookingSchema = exports.BookingSchema.partial().omit({ id, createdAt });
