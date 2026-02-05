import { getTripsForUser } from './trips';

// Infer the type from the Prisma query return type
export type TripWithDetails = Awaited<ReturnType<typeof getTripsForUser>>[number];

export interface DateRange {
  start_date: Date
  end_date: Date
}

export interface CreatedTrip {
  trip_id: string
  code: string
  trip_name: string | null
}
