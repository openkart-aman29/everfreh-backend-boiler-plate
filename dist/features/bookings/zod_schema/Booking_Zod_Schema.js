"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingZodSchema = exports.createBookingZodSchema = exports.bookingZodSchema = void 0;
const zod_1 = require("zod");
const ULID_Zod_Schema_1 = require("../../../utilities/global_schemas/ULID_Zod_Schema");
exports.bookingZodSchema = zod_1.z.object({
    company_id: ULID_Zod_Schema_1.ulidZodSchema,
    customer_id: ULID_Zod_Schema_1.ulidZodSchema,
    service_id: ULID_Zod_Schema_1.ulidZodSchema,
    staff_id: ULID_Zod_Schema_1.ulidZodSchema.nullable().optional(),
    scheduled_date: zod_1.z.coerce.date({
        required_error: "Scheduled date is required",
        invalid_type_error: "Invalid date format"
    }),
    scheduled_time_start: zod_1.z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
    scheduled_time_end: zod_1.z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
        .nullable()
        .optional(),
    service_location: zod_1.z.string()
        .min(5, "Location must be at least 5 characters")
        .max(500, "Location cannot exceed 500 characters"),
    total_amount: zod_1.z.number()
        .min(0, "Amount cannot be negative")
        .max(999999.99, "Amount too large")
});
// Operation-specific schemas
exports.createBookingZodSchema = exports.bookingZodSchema;
exports.updateBookingZodSchema = exports.bookingZodSchema.partial();
