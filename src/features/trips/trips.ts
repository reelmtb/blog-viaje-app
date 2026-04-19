"use server";
import 'server-only';
import { prisma } from '@/lib/prisma';
import { TRIP_CODE_CHARS, TRIP_CODE_LENGTH } from '@/constants/trip';

/* ---------------- Helper functions ---------------- */
function generateTripCode(): string {
  let code = "";
  for (let i = 0; i < TRIP_CODE_LENGTH; i++) {
    code += TRIP_CODE_CHARS.charAt(Math.floor(Math.random() * TRIP_CODE_CHARS.length));
  }
  return code;
}

/* ---------------- Types ---------------- */
export interface CreateTripInput {
  trip_name: string;
  starter_id: string;
  destinations?: string[]; // destination names (will create if not exist)
  availabilities?: { start_date: Date; end_date: Date }[];
  max_cost?: number;
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

export async function createTripWithPreferences(data: CreateTripInput) {
  if (!data.trip_name) throw new Error('Trip name required');
  if (!data.starter_id) throw new Error('Starter ID required');
  return createTripWithPreferencesInDb(data);
}

export async function getTrip(trip_id: string) {
  console.log('Fetching trip with ID:', trip_id);
  if (!trip_id) throw new Error('Trip ID required');
  return getTripById(trip_id);
}

export async function getTripByCode(code: string) {
  console.log('Fetching trip with code:', code);
  if (!code) throw new Error('Trip code required');
  return getTripByCodeFromDb(code);
}

export interface JoinTripInput {
  code: string;
  user_id: string;
  destinations?: string[]; // destination names to vote for or suggest
  availabilities?: { start_date: Date; end_date: Date }[];
  max_cost?: number;
}

export async function joinTrip(data: JoinTripInput) {
  console.log('Joining trip with data:', data);
  if (!data.code) throw new Error('Trip code required');
  if (!data.user_id) throw new Error('User ID required');
  return joinTripInDb(data);
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

async function createTripWithPreferencesInDb(data: CreateTripInput) {
  return prisma.$transaction(async (tx) => {
    // 1. Create the trip
    const trip = await tx.trip.create({
      data: {
        trip_name: data.trip_name,
        code: generateTripCode(),
        starter_id: data.starter_id,
      },
    });

    // 2. Create participant for the starter
    const participant = await tx.tripParticipant.create({
      data: {
        trip_id: trip.trip_id,
        user_id: data.starter_id,
        max_cost: data.max_cost,
      },
    });

    // 3. Create destinations and link to trip
    if (data.destinations && data.destinations.length > 0) {
      for (const destName of data.destinations) {
        // Find or create destination
        let destination = await tx.destination.findFirst({
          where: { name: { equals: destName, mode: 'insensitive' } },
        });

        if (!destination) {
          destination = await tx.destination.create({
            data: { name: destName },
          });
        }

        // Create trip destination option
        await tx.tripDestinationOption.create({
          data: {
            trip_id: trip.trip_id,
            destination_id: destination.destination_id,
          },
        });
      }
    }

    // 4. Create availabilities for the starter
    if (data.availabilities && data.availabilities.length > 0) {
      await tx.availability.createMany({
        data: data.availabilities.map((a) => ({
          participant_id: participant.participant_id,
          start_date: a.start_date,
          end_date: a.end_date,
        })),
      });
    }

    // Return the created trip with code
    return { trip_id: trip.trip_id, code: trip.code, trip_name: trip.trip_name };
  });
}

async function getTripByCodeFromDb(code: string) {
  return prisma.trip.findUnique({
    where: { code },
    include: {
      starter: {
        select: { user_id: true, name: true },
      },
      participants: {
        include: {
          user: { select: { user_id: true, name: true } },
          votes: {
            include: {
              trip_destination: {
                include: { destination: true },
              },
            },
          },
          availabilities: true,
        },
      },
      locationOptions: {
        include: {
          destination: true,
          votes: true,
        },
      },
    },
  });
}

async function joinTripInDb(data: JoinTripInput) {
  return prisma.$transaction(async (tx) => {
    // 1. Find the trip by code
    const trip = await tx.trip.findUnique({
      where: { code: data.code },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    // 2. Verify user exists
    const user = await tx.user.findUnique({
      where: { user_id: data.user_id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // 3. Check if user is already a participant
    const existingParticipant = await tx.tripParticipant.findUnique({
      where: {
        trip_id_user_id: {
          trip_id: trip.trip_id,
          user_id: data.user_id,
        },
      },
    });

    if (existingParticipant) {
      throw new Error('You have already joined this trip');
    }

    // 4. Create participant
    const participant = await tx.tripParticipant.create({
      data: {
        trip_id: trip.trip_id,
        user_id: data.user_id,
        max_cost: data.max_cost,
      },
    });

    // 5. Handle destinations (vote for existing or suggest new ones)
    if (data.destinations && data.destinations.length > 0) {
      for (const destName of data.destinations) {
        // Find or create destination
        let destination = await tx.destination.findFirst({
          where: { name: { equals: destName, mode: 'insensitive' } },
        });

        if (!destination) {
          destination = await tx.destination.create({
            data: { name: destName },
          });
        }

        // Find or create trip destination option
        let tripDestOption = await tx.tripDestinationOption.findUnique({
          where: {
            trip_id_destination_id: {
              trip_id: trip.trip_id,
              destination_id: destination.destination_id,
            },
          },
        });

        if (!tripDestOption) {
          tripDestOption = await tx.tripDestinationOption.create({
            data: {
              trip_id: trip.trip_id,
              destination_id: destination.destination_id,
            },
          });
        }

        // Create vote for this destination
        await tx.destinationVote.create({
          data: {
            participant_id: participant.participant_id,
            trip_destination_id: tripDestOption.id,
          },
        });
      }
    }

    // 6. Create availabilities
    if (data.availabilities && data.availabilities.length > 0) {
      await tx.availability.createMany({
        data: data.availabilities.map((a) => ({
          participant_id: participant.participant_id,
          start_date: a.start_date,
          end_date: a.end_date,
        })),
      });
    }

    return { trip_id: trip.trip_id, code: trip.code, trip_name: trip.trip_name };
  });
}
