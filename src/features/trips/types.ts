import { getTripsForUser } from './trips';

// Infer the type from the Prisma query return type
export type TripWithDetails = Awaited<ReturnType<typeof getTripsForUser>>[number];
