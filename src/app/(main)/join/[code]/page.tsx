import { notFound } from "next/navigation"
import { getTripByCode } from "@/features/trips/trips"
import { JoinTripOverview } from "@/components/trips/join/join-trip-overview"
import { toJoinTripOverviewData } from "@/components/trips/join/transforms"

interface JoinTripPageProps {
  params: Promise<{ code: string }>
}

export default async function JoinTripPage({ params }: JoinTripPageProps) {
  const { code } = await params
  const trip = await getTripByCode(code)

  if (!trip) {
    notFound()
  }

  return <JoinTripOverview trip={toJoinTripOverviewData(trip)} />
}
