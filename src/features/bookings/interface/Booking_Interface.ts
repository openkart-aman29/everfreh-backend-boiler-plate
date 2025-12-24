import { RecordIDInterface } from '@/utilities/global_interfaces/Record_ID_Interface';

export interface BookingDataInterface {
    company_id: string;              // ULID
    customer_id: string;             // ULID
    service_id: string;              // ULID
    staff_id: string | null;         // ULID or null
    booking_number: string;          // Generated format
    status: string;
    scheduled_date: Date;
    scheduled_time_start: string;
    scheduled_time_end: string | null;
    service_location: string;
    total_amount: number;
}

export interface BookingInterface extends BookingDataInterface {
    booking_id: string;              // ULID (Primary Key)
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}