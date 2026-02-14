export interface TripDestination {
  id: string
  destination: {
    destination_id: string
    name: string
    country: string | null
    image: string | null
  }
  votes: { id: string }[]
}

export interface TripParticipant {
  participant_id: string
  user: {
    user_id: string
    name: string | null
  }
  max_cost: number | null
  availabilities: {
    id: string
    start_date: string
    end_date: string
  }[]
}

export interface JoinTripOverviewData {
  trip_id: string
  trip_name: string | null
  code: string
  starter: {
    user_id: string
    name: string | null
  }
  participants: TripParticipant[]
  locationOptions: TripDestination[]
}

export interface JoinTripPreferencesData {
  trip_id: string
  trip_name: string | null
  code: string
  locationOptions: TripDestination[]
}
