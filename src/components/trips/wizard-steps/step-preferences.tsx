"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, XIcon, CalendarIcon, DollarSignIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const BUDGET_PRESETS = [
  { value: 500, label: "$500" },
  { value: 1000, label: "$1,000" },
  { value: 2000, label: "$2,000" },
  { value: 3000, label: "$3,000" },
  { value: 5000, label: "$5,000" },
  { value: 10000, label: "$10,000+" },
]

interface DateRange {
  start_date: Date
  end_date: Date
}

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
}: StepPreferencesProps) {
  const [newDestination, setNewDestination] = useState("")
  const [customBudget, setCustomBudget] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [tempRange, setTempRange] = useState<{ from: Date; to?: Date } | undefined>(undefined)

  const addDestination = () => {
    if (newDestination.trim() && !destinations.includes(newDestination.trim())) {
      onDestinationsChange([...destinations, newDestination.trim()])
      setNewDestination("")
    }
  }

  const removeDestination = (dest: string) => {
    onDestinationsChange(destinations.filter((d) => d !== dest))
  }

  const handleCalendarSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range || !range.from) {
      setTempRange(undefined)
      return
    }
    setTempRange({ from: range.from, to: range.to })
  }

  const addDateRange = () => {
    if (tempRange?.from && tempRange?.to) {
      onAvailabilitiesChange([
        ...availabilities,
        { start_date: tempRange.from, end_date: tempRange.to },
      ])
      setTempRange(undefined)
      setIsCalendarOpen(false)
    }
  }

  const removeDateRange = (index: number) => {
    onAvailabilitiesChange(availabilities.filter((_, i) => i !== index))
  }

  const formatDateRange = (range: DateRange) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
    const start = range.start_date.toLocaleDateString("en-US", options)
    const end = range.end_date.toLocaleDateString("en-US", { ...options, year: "numeric" })
    return `${start} - ${end}`
  }

  const formatTempRange = () => {
    if (!tempRange?.from) return "Pick a start and end date"
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
    if (!tempRange.to) return tempRange.from.toLocaleDateString("en-US", options)
    const start = tempRange.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    const end = tempRange.to.toLocaleDateString("en-US", options)
    return `${start} - ${end}`
  }

  const handlePresetSelect = (value: number) => {
    setCustomBudget("")
    onMaxCostChange(maxCost === value ? null : value)
  }

  const handleCustomBudgetChange = (value: string) => {
    setCustomBudget(value)
    const numValue = parseInt(value.replace(/[^0-9]/g, ""))
    if (!isNaN(numValue) && numValue > 0) {
      onMaxCostChange(numValue)
    } else if (value === "") {
      onMaxCostChange(null)
    }
  }

  const isPresetSelected = maxCost !== null && BUDGET_PRESETS.some((p) => p.value === maxCost)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Preferences</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All fields are optional - add what you&apos;d like to share with the group
        </p>
      </div>

      {/* Destinations */}
      {/* TODO: Replace text input with Google Places API autocomplete for better destination suggestions */}
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
        <div className="space-y-4">
          {/* Selected date ranges */}
          {availabilities.length > 0 && (
            <div className="space-y-2">
              {availabilities.map((range, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {formatDateRange(range)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDateRange(index)}
                    className="h-8 w-8 p-0"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add date range button with calendar popover */}
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  availabilities.length === 0 && "text-muted-foreground"
                )}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                {availabilities.length === 0
                  ? "Add date range"
                  : "Add another date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Select date range</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {formatTempRange()}
                  </p>
                </div>
                <Calendar
                  mode="range"
                  selected={tempRange}
                  onSelect={handleCalendarSelect}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={addDateRange}
                    disabled={!tempRange?.from || !tempRange?.to}
                    className="flex-1"
                  >
                    Add Range
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTempRange(undefined)
                      setIsCalendarOpen(false)
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      {/* Budget */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Set Your Budget</h2>
          <p className="text-sm text-muted-foreground mt-1">
            What&apos;s the maximum you&apos;re willing to spend per person?
          </p>
        </div>
        <div className="space-y-6">
          {/* Preset budgets */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Choose a budget range</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BUDGET_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handlePresetSelect(preset.value)}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200",
                    "hover:border-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    maxCost === preset.value && isPresetSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background"
                  )}
                >
                  <DollarSignIcon
                    className={cn(
                      "h-5 w-5 mb-2",
                      maxCost === preset.value && isPresetSelected
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "font-semibold",
                      maxCost === preset.value && isPresetSelected
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Custom budget */}
          <div className="space-y-3">
            <Label htmlFor="custom-budget" className="text-base font-medium">
              Enter a custom budget
            </Label>
            <div className="relative">
              <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="custom-budget"
                type="text"
                placeholder="Enter amount"
                value={customBudget}
                onChange={(e) => handleCustomBudgetChange(e.target.value)}
                className="pl-9 text-lg"
              />
            </div>
          </div>

          {/* Selected budget display */}
          {maxCost && (
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Maximum budget per person
                </span>
                <span className="text-lg font-semibold text-foreground">
                  ${maxCost.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
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
  )
}
