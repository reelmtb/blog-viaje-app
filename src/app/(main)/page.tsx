import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { TripsList } from "@/components/trips/trips-list"
import { getTripsForUser } from "@/features/trips/trips"
import { JoinTripDialog } from "@/components/trips/join-trip-dialog"

// Mock user ID - will be replaced with auth later
const MOCK_USER_ID = "11111111-1111-1111-1111-111111111111"

export default async function HomePage() {
  const trips = await getTripsForUser(MOCK_USER_ID)
  const hasTrips = trips.length > 0

  return (
    <div className="space-y-20">
      {/* My Trips Section */}
      <TripsList trips={trips} />

      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 md:py-20">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Plan trips together,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">effortlessly</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No sign-ups. No spreadsheets. No endless group chats.
            <br />
            Just simple, collaborative travel planning.
          </p>
        </div>

        {hasTrips && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/trip/new">
              <Button size="lg" className="text-lg px-8 h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30">
                Plan Another Trip
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <JoinTripDialog />
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to plan your perfect group trip
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="relative space-y-4 p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">1. Create Trip</h3>
              <p className="text-sm text-muted-foreground">
                Give your trip a name and get started
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative space-y-4 p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <MapPinIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">2. Add Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Suggest destinations, dates, and budget
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative space-y-4 p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <ArrowRightIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">3. Invite Group</h3>
              <p className="text-sm text-muted-foreground">
                Share a link for others to join and vote
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative space-y-4 p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">4. Decide Together</h3>
              <p className="text-sm text-muted-foreground">
                See overlapping dates and top destinations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-12 md:py-20 bg-muted/50 -mx-4 px-4 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to plan your next adventure?
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Create a trip in minutes and invite your friends to join
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/trip/new">
            <Button size="lg" className="text-lg px-8 h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30">
              Start Planning Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <JoinTripDialog />
        </div>
      </section>
    </div>
  )
}
