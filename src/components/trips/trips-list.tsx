import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon, MapPinIcon } from "lucide-react"
import { TripCard } from "./trip-card"
import { TripWithDetails } from "@/features/trips/types"

interface TripsListProps {
  trips: TripWithDetails[]
}

export function TripsList({ trips }: TripsListProps) {
  if (trips.length === 0) {
    return (
      <section className="text-center space-y-4 py-8 px-4 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center mx-auto">
          <MapPinIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">No trips yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start planning your first group trip or join an existing one
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30">
            <Link href="/trip/new">
              <PlusIcon className="h-4 w-4" />
              Create Your First Trip
            </Link>
          </Button>
          {/* TODO: Add "Join a Trip" button linking to /join when Phase 4 is complete */}
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">My Trips</h2>
          <p className="text-muted-foreground mt-1">
            {trips.length} {trips.length === 1 ? "trip" : "trips"} in progress
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950">
          <Link href="/trip/new">
            <PlusIcon className="h-4 w-4" />
            New Trip
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map((trip) => (
          <TripCard key={trip.trip_id} trip={trip} />
        ))}
      </div>
    </section>
  )
}
