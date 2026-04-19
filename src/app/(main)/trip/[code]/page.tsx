import { notFound } from "next/navigation"
import { getTripByCode } from "@/features/trips/trips"
import { JoinTripOverview } from "@/components/trips/join/join-trip-overview"
import { toJoinTripOverviewData } from "@/components/trips/join/transforms"

interface TripPageProps {
  params: Promise<{ code: string }>
}

export default async function TripPage({ params }: TripPageProps) {
  const { code } = await params
  const trip = await getTripByCode(code)

  console.log('TripPage params:', { code })
  console.log('Fetched trip:', trip)

  if (!trip) {
    notFound()
  }

  return <JoinTripOverview trip={toJoinTripOverviewData(trip)} />
}
