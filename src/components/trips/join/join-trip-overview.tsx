"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPinIcon, CalendarIcon, DollarSignIcon, UsersIcon, ArrowRightIcon } from "lucide-react"
import { JoinTripOverviewData } from "./types"
import { formatCurrency } from "@/lib/formatters"
import { PREVIEW_LIMIT } from "@/constants/trip"

interface JoinTripOverviewProps {
  trip: JoinTripOverviewData
}

export function JoinTripOverview({ trip }: JoinTripOverviewProps) {
  const destinationsSummary = [...trip.locationOptions]
    .sort((a, b) => b.votes.length - a.votes.length)
    .slice(0, PREVIEW_LIMIT)

  const dateRangesCount = trip.participants.reduce(
    (acc, p) => acc + p.availabilities.length,
    0
  )

  const budgets = trip.participants
    .map((p) => p.max_cost)
    .filter((b): b is number => b !== null)
  const minBudget = budgets.length > 0 ? Math.min(...budgets) : null
  const maxBudget = budgets.length > 0 ? Math.max(...budgets) : null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
            <UsersIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Join {trip.trip_name || "Untitled Trip"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {trip.participants.length} {trip.participants.length === 1 ? "person has" : "people have"} already joined
        </p>
      </div>

      {/* Current State */}
      <div className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold">What&apos;s been suggested so far</h2>

        {/* Destinations */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <MapPinIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">Destinations</h3>
              <p className="text-sm text-muted-foreground">
                {trip.locationOptions.length} {trip.locationOptions.length === 1 ? "destination" : "destinations"} suggested
              </p>
            </div>
          </div>

          {destinationsSummary.length > 0 ? (
            <div className="space-y-2">
              {destinationsSummary.map((dest) => (
                <div
                  key={dest.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {dest.destination.image ? (
                      <img
                        src={dest.destination.image}
                        alt={dest.destination.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-md flex items-center justify-center">
                        <MapPinIcon className="w-6 h-6 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{dest.destination.name}</p>
                      {dest.destination.country && (
                        <p className="text-sm text-muted-foreground">
                          {dest.destination.country}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {dest.votes.length} {dest.votes.length === 1 ? "vote" : "votes"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No destinations suggested yet
            </p>
          )}
        </Card>

        {/* Availability */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">Availability</h3>
              <p className="text-sm text-muted-foreground">
                {dateRangesCount} date {dateRangesCount === 1 ? "range" : "ranges"} added
              </p>
            </div>
          </div>

          {dateRangesCount > 0 ? (
            <div className="space-y-2">
              {trip.participants
                .filter((p) => p.availabilities.length > 0)
                .slice(0, PREVIEW_LIMIT)
                .map((participant) => (
                  <div key={participant.participant_id} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {(participant.user.name || "?")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">
                      <span className="font-medium">{participant.user.name || "Anonymous"}</span> added{" "}
                      {participant.availabilities.length}{" "}
                      {participant.availabilities.length === 1 ? "range" : "ranges"}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No dates added yet
            </p>
          )}
        </Card>

        {/* Budget */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <DollarSignIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">Budget Range</h3>
              <p className="text-sm text-muted-foreground">
                {budgets.length} {budgets.length === 1 ? "person has" : "people have"} set a budget
              </p>
            </div>
          </div>

          {minBudget && maxBudget ? (
            <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold">{formatCurrency(minBudget)}</p>
                <p className="text-xs text-muted-foreground">Min</p>
              </div>
              <div className="text-muted-foreground">—</div>
              <div className="text-center">
                <p className="text-2xl font-bold">{formatCurrency(maxBudget)}</p>
                <p className="text-xs text-muted-foreground">Max</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No budgets set yet
            </p>
          )}
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Link href={`/join/${trip.code}/preferences`}>
          <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30">
            Add Your Preferences
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground">
          All preferences are optional - add what you&apos;d like to share
        </p>
      </div>
    </div>
  )
}
