"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, ArrowLeftIcon, PlusIcon, XIcon, CheckIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DateRange } from "@/features/trips/types"
import { DateRangePicker } from "@/components/trips/shared/date-range-picker"
import { BudgetSelector } from "@/components/trips/shared/budget-selector"
import { JoinTripPreferencesData } from "./types"

const MOCK_USER_ID = "11111111-1111-1111-1111-111111111111"

interface JoinTripPreferencesProps {
  trip: JoinTripPreferencesData
}

export function JoinTripPreferences({ trip }: JoinTripPreferencesProps) {
  const router = useRouter()
  const [votedDestinations, setVotedDestinations] = useState<string[]>([])
  const [newDestinations, setNewDestinations] = useState<string[]>([])
  const [newDestinationInput, setNewDestinationInput] = useState("")
  const [showDestinationSearch, setShowDestinationSearch] = useState(false)
  const [dateRanges, setDateRanges] = useState<DateRange[]>([])
  const [budget, setBudget] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVote = (destinationName: string) => {
    setVotedDestinations((prev) =>
      prev.includes(destinationName)
        ? prev.filter((n) => n !== destinationName)
        : [...prev, destinationName]
    )
  }

  const handleSuggestDestination = () => {
    const trimmed = newDestinationInput.trim()
    if (trimmed && !newDestinations.includes(trimmed)) {
      setNewDestinations((prev) => [...prev, trimmed])
      setVotedDestinations((prev) => [...prev, trimmed])
      setNewDestinationInput("")
      setShowDestinationSearch(false)
    }
  }

  const handleJoin = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const allDestinations = [...votedDestinations]

      const response = await fetch(`/api/trips/${trip.code}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: MOCK_USER_ID,
          destinations: allDestinations.length > 0 ? allDestinations : undefined,
          availabilities: dateRanges.length > 0
            ? dateRanges.map((r) => ({
                start_date: r.start_date.toISOString(),
                end_date: r.end_date.toISOString(),
              }))
            : undefined,
          max_cost: budget,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to join trip")
      }

      router.push(`/trip/${trip.code}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join trip")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add Your Preferences</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Join {trip.trip_name || "this trip"} and share your travel preferences
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Destinations */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Vote for Destinations</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Vote for existing destinations or suggest new ones (optional)
            </p>
          </div>

          <div className="space-y-6">
            {/* Existing Destinations */}
            {trip.locationOptions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Suggested Destinations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trip.locationOptions.map((dest) => {
                    const isVoted = votedDestinations.includes(dest.destination.name)
                    return (
                      <Card
                        key={dest.id}
                        className={cn(
                          "relative overflow-hidden cursor-pointer transition-all hover:shadow-md",
                          isVoted && "ring-2 ring-primary"
                        )}
                        onClick={() => handleVote(dest.destination.name)}
                      >
                        <div className="flex items-center gap-3 p-3">
                          {dest.destination.image ? (
                            <img
                              src={dest.destination.image}
                              alt={dest.destination.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-md flex items-center justify-center">
                              <span className="text-2xl">🌍</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">
                              {dest.destination.name}
                            </h4>
                            {dest.destination.country && (
                              <p className="text-sm text-muted-foreground truncate">
                                {dest.destination.country}
                              </p>
                            )}
                            <Badge variant="secondary" className="mt-1">
                              {dest.votes.length} {dest.votes.length === 1 ? "vote" : "votes"}
                            </Badge>
                          </div>
                          {isVoted && (
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <CheckIcon className="w-5 h-5 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* New Suggested Destinations */}
            {newDestinations.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Your Suggestions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {newDestinations.map((dest) => (
                    <Badge key={dest} variant="secondary" className="px-3 py-1 text-sm">
                      {dest}
                      <button
                        type="button"
                        onClick={() => {
                          setNewDestinations((prev) => prev.filter((d) => d !== dest))
                          setVotedDestinations((prev) => prev.filter((d) => d !== dest))
                        }}
                        className="ml-2 hover:text-destructive"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Destination */}
            <div className="space-y-3">
              {!showDestinationSearch ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowDestinationSearch(true)}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Suggest a Destination
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter a city name..."
                      value={newDestinationInput}
                      onChange={(e) => setNewDestinationInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSuggestDestination())}
                      className="pl-10"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSuggestDestination} disabled={!newDestinationInput.trim()} className="flex-1">
                      Add Destination
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowDestinationSearch(false)
                        setNewDestinationInput("")
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Availability */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Add Your Available Dates</h2>
            <p className="text-sm text-muted-foreground mt-1">
              When are you available to travel? (optional)
            </p>
          </div>
          <DateRangePicker
            dateRanges={dateRanges}
            onDateRangesChange={setDateRanges}
          />
        </Card>

        {/* Budget */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Set Your Budget</h2>
            <p className="text-sm text-muted-foreground mt-1">
              What&apos;s the maximum you&apos;re willing to spend per person? (optional)
            </p>
          </div>
          <BudgetSelector budget={budget} onBudgetChange={setBudget} />
        </Card>

        {/* Actions */}
        <div className="space-y-4 pt-6 border-t border-border">
          {error && (
            <p className="text-sm text-destructive text-right">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push(`/join/${trip.code}`)}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              disabled={isSubmitting}
              onClick={handleJoin}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none"
            >
              {isSubmitting ? "Joining..." : "Join Trip"}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
