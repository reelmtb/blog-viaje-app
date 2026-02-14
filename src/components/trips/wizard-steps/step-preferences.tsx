"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, XIcon } from "lucide-react"
import { DateRange } from "@/features/trips/types"
import { DateRangePicker } from "@/components/trips/shared/date-range-picker"
import { BudgetSelector } from "@/components/trips/shared/budget-selector"

interface StepPreferencesProps {
  destinations: string[]
  availabilities: DateRange[]
  maxCost: number | null
  onDestinationsChange: (destinations: string[]) => void
  onAvailabilitiesChange: (availabilities: DateRange[]) => void
  onMaxCostChange: (maxCost: number | null) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  error: string | null
}

export function StepPreferences({
  destinations,
  availabilities,
  maxCost,
  onDestinationsChange,
  onAvailabilitiesChange,
  onMaxCostChange,
  onBack,
  onSubmit,
  isSubmitting,
  error,
}: StepPreferencesProps) {
  const [newDestination, setNewDestination] = useState("")

  const addDestination = () => {
    if (newDestination.trim() && !destinations.includes(newDestination.trim())) {
      onDestinationsChange([...destinations, newDestination.trim()])
      setNewDestination("")
    }
  }

  const removeDestination = (dest: string) => {
    onDestinationsChange(destinations.filter((d) => d !== dest))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Preferences</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All fields are optional - add what you&apos;d like to share with the group
        </p>
      </div>

      {/* Destinations */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Suggest Destinations</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Where would you like to go? You can suggest multiple destinations
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Paris, Tokyo, New York"
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDestination())}
            />
            <Button type="button" variant="outline" onClick={addDestination}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          {destinations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {destinations.map((dest) => (
                <Badge key={dest} variant="secondary" className="px-3 py-1 text-sm">
                  {dest}
                  <button
                    type="button"
                    onClick={() => removeDestination(dest)}
                    className="ml-2 hover:text-destructive"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Availability */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Add Your Available Dates</h2>
          <p className="text-sm text-muted-foreground mt-1">
            When are you available to travel? You can add multiple date ranges
          </p>
        </div>
        <DateRangePicker
          dateRanges={availabilities}
          onDateRangesChange={onAvailabilitiesChange}
        />
      </Card>

      {/* Budget */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Set Your Budget</h2>
          <p className="text-sm text-muted-foreground mt-1">
            What&apos;s the maximum you&apos;re willing to spend per person?
          </p>
        </div>
        <BudgetSelector budget={maxCost} onBudgetChange={onMaxCostChange} />
      </Card>

      {/* Actions */}
      <div className="space-y-4 pt-6 border-t border-border">
        {error && (
          <p className="text-sm text-destructive text-right">{error}</p>
        )}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30"
          >
            {isSubmitting ? "Creating..." : "Create Trip"}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
