import { DateRange } from "@/features/trips/types"

export function formatDateRange(range: DateRange): string {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
  const start = range.start_date.toLocaleDateString("en-US", options)
  const end = range.end_date.toLocaleDateString("en-US", { ...options, year: "numeric" })
  return `${start} - ${end}`
}

export function formatTempDateRange(tempRange: { from: Date; to?: Date } | undefined): string {
  if (!tempRange?.from) return "Pick a start and end date"
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
  if (!tempRange.to) return tempRange.from.toLocaleDateString("en-US", options)
  const start = tempRange.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  const end = tempRange.to.toLocaleDateString("en-US", options)
  return `${start} - ${end}`
}

export function formatCurrency(value: number): string {
  return `$${value.toLocaleString()}`
}
