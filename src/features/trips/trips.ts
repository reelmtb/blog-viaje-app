"use server";
import 'server-only';
import { prisma } from '@/lib/prisma';

/* ---------------- Helper functions ---------------- */
function generateTripCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

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

export async function getTripsForUser(user_id: string) {
  if (!user_id) throw new Error('User ID required');
  return getTripsForUserFromDb(user_id);
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
      code: generateTripCode(),
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

async function getTripsForUserFromDb(user_id: string) {
  return prisma.trip.findMany({
    where: {
      OR: [
        { starter_id: user_id },
        { participants: { some: { user_id } } },
      ],
    },
    include: {
      participants: {
        include: {
          user: true,
          votes: true,
        },
      },
      locationOptions: {
        include: {
          destination: true,
          votes: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}
