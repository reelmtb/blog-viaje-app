import type { JoinTripOverviewData, JoinTripPreferencesData } from "./types"

// Type for the raw Prisma trip data from getTripByCode
type PrismaTripData = {
  trip_id: string
  trip_name: string | null
  code: string
  starter: {
    user_id: string
    name: string | null
  }
  participants: {
    participant_id: string
    user: {
      user_id: string
      name: string | null
    }
    max_cost: number | null
    availabilities: {
      id: string
      start_date: Date
      end_date: Date
    }[]
  }[]
  locationOptions: {
    id: string
    destination: {
      destination_id: string
      name: string
      country: string | null
      image: string | null
    }
    votes: { id: string }[]
  }[]
}

function transformLocationOptions(locationOptions: PrismaTripData["locationOptions"]) {
  return locationOptions.map((lo) => ({
    id: lo.id,
    destination: lo.destination,
    votes: lo.votes,
  }))
}

function transformParticipants(participants: PrismaTripData["participants"]) {
  return participants.map((p) => ({
    participant_id: p.participant_id,
    user: p.user,
    max_cost: p.max_cost,
    availabilities: p.availabilities.map((a) => ({
      id: a.id,
      start_date: a.start_date.toISOString(),
      end_date: a.end_date.toISOString(),
    })),
  }))
}

export function toJoinTripOverviewData(trip: PrismaTripData): JoinTripOverviewData {
  return {
    trip_id: trip.trip_id,
    trip_name: trip.trip_name,
    code: trip.code,
    starter: trip.starter,
    participants: transformParticipants(trip.participants),
    locationOptions: transformLocationOptions(trip.locationOptions),
  }
}

export function toJoinTripPreferencesData(trip: PrismaTripData): JoinTripPreferencesData {
  return {
    trip_id: trip.trip_id,
    trip_name: trip.trip_name,
    code: trip.code,
    locationOptions: transformLocationOptions(trip.locationOptions),
  }
}
