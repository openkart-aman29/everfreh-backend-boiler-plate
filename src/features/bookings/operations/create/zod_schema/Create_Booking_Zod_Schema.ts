import { z } from 'zod';
import { ulidZodSchema } from '@/utilities/global_schemas/ULID_Zod_Schema';

export const createBookingZodSchema = z.object({
    company_id: ulidZodSchema,
    customer_id: ulidZodSchema,
    service_id: ulidZodSchema,
    staff_id: ulidZodSchema.nullable().optional(),

    scheduled_date: z.coerce.date({
        required_error: "Scheduled date is required",
        invalid_type_error: "Invalid date format"
    }),

    scheduled_time_start: z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),

    scheduled_time_end: z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
        .nullable()
        .optional(),

    service_location: z.string()
        .min(5, "Location must be at least 5 characters")
        .max(500, "Location cannot exceed 500 characters"),

    total_amount: z.number()
        .min(0, "Amount cannot be negative")
        .max(999999.99, "Amount too large")
});