"use server";
import 'server-only';
import { prisma } from '@/lib/prisma';

/* ---------------- Service functions ---------------- */
export async function createTrip(data: {
  trip_name: string;
  starter_id: string;
  destinationIds?: string[];
}) {
  if (!data.trip_name) throw new Error('Trip name required');
  return createTripInDb(data);
}

export async function getTrip(trip_id: string) {
  if (!trip_id) throw new Error('Trip ID required');
  return getTripById(trip_id);
}

/* ---------------- Repository functions ---------------- */
async function createTripInDb(data: {
  trip_name: string;
  starter_id: string;
  destinationIds?: string[];
}) {
  return prisma.trip.create({
    data: {
      trip_name: data.trip_name,
      starter_id: data.starter_id,
      locationOptions: data.destinationIds
        ? { create: data.destinationIds.map((destination_id) => ({ destination_id })) }
        : undefined,
    },
    include: { locationOptions: true },
  });
}

async function getTripById(trip_id: string) {
  return prisma.trip.findUnique({
    where: { trip_id },
    include: { locationOptions: true, participants: true },
  });
}
