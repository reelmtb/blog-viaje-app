import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, MapPinIcon, UsersIcon, ArrowRightIcon } from "lucide-react"
import { TripWithDetails } from "@/features/trips/types"

interface TripCardProps {
  trip: TripWithDetails
}

export function TripCard({ trip }: TripCardProps) {
  // Find the destination with the most votes
  const topDestination = trip.locationOptions.length > 0
    ? trip.locationOptions.reduce((top, current) =>
        current.votes.length > top.votes.length ? current : top
      )
    : null

  const participantCount = trip.participants.length

  return (
    <Link href={`/trip/${trip.code}`}>
      <Card className="hover:shadow-lg hover:shadow-blue-500/10 transition-all hover:border-blue-500/50 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {trip.trip_name || "Untitled Trip"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Code: <span className="font-mono font-semibold">{trip.code}</span>
              </p>
            </div>
            <ArrowRightIcon className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top Destination */}
          {topDestination && (
            <div className="flex items-center gap-2 text-sm">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {topDestination.destination.name}
                {topDestination.destination.country && `, ${topDestination.destination.country}`}
              </span>
              <Badge variant="secondary" className="ml-auto bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                {topDestination.votes.length} {topDestination.votes.length === 1 ? "vote" : "votes"}
              </Badge>
            </div>
          )}

          {/* Date Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>
              Created {trip.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {trip.participants.slice(0, 4).map((participant) => (
                <Avatar key={participant.participant_id} className="h-8 w-8 border-2 border-background">
                  <AvatarFallback>
                    {participant.user.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              {participantCount} {participantCount === 1 ? "person" : "people"}
            </span>
          </div>

          {/* Additional Info */}
          <div className="flex gap-2 pt-2">
            {trip.locationOptions.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {trip.locationOptions.length} {trip.locationOptions.length === 1 ? "destination" : "destinations"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
