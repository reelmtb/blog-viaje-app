import { notFound } from "next/navigation"
import { getTripByCode } from "@/features/trips/trips"
import { JoinTripPreferences } from "@/components/trips/join/join-trip-preferences"
import { toJoinTripPreferencesData } from "@/components/trips/join/transforms"

interface JoinTripPreferencesPageProps {
  params: Promise<{ code: string }>
}

export default async function JoinTripPreferencesPage({ params }: JoinTripPreferencesPageProps) {
  const { code } = await params
  const trip = await getTripByCode(code)

  if (!trip) {
    notFound()
  }

  return <JoinTripPreferences trip={toJoinTripPreferencesData(trip)} />
}
