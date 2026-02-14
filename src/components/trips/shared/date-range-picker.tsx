"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PlusIcon, XIcon, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDateRange, formatTempDateRange } from "@/lib/formatters"
import { DateRange } from "@/features/trips/types"

interface DateRangePickerProps {
  dateRanges: DateRange[]
  onDateRangesChange: (ranges: DateRange[]) => void
}

export function DateRangePicker({ dateRanges, onDateRangesChange }: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [tempRange, setTempRange] = useState<{ from: Date; to?: Date } | undefined>(undefined)

  const handleCalendarSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range || !range.from) {
      setTempRange(undefined)
      return
    }
    setTempRange({ from: range.from, to: range.to })
  }

  const addDateRange = () => {
    if (tempRange?.from && tempRange?.to) {
      const newRange: DateRange = {
        start_date: tempRange.from,
        end_date: tempRange.to,
      }
      onDateRangesChange([...dateRanges, newRange])
      setTempRange(undefined)
      setIsCalendarOpen(false)
    }
  }

  const removeDateRange = (index: number) => {
    onDateRangesChange(dateRanges.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {/* Selected date ranges */}
      {dateRanges.length > 0 && (
        <div className="space-y-2">
          {dateRanges.map((range, index) => (
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
              dateRanges.length === 0 && "text-muted-foreground"
            )}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {dateRanges.length === 0
              ? "Add date range"
              : "Add another date range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Select date range</h4>
              <p className="text-xs text-muted-foreground mb-3">
                {formatTempDateRange(tempRange)}
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
  )
}
