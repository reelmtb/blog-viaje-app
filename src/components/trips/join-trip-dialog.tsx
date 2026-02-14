"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TRIP_CODE_LENGTH } from "@/constants/trip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRightIcon } from "lucide-react"

export function JoinTripDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedCode = code.trim().toUpperCase()

    if (!trimmedCode) {
      setError("Please enter a trip code")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Check if the trip exists
      const response = await fetch(`/api/trips/${trimmedCode}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError("Trip not found. Please check the code and try again.")
        } else {
          setError("Something went wrong. Please try again.")
        }
        return
      }

      // Trip exists, navigate to join page
      setOpen(false)
      router.push(`/join/${trimmedCode}`)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="text-lg px-8 h-12">
          Join a Trip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join a Trip</DialogTitle>
          <DialogDescription>
            Enter the {TRIP_CODE_LENGTH}-character code shared by the trip organizer
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trip-code">Trip Code</Label>
            <Input
              id="trip-code"
              type="text"
              placeholder="e.g., ABC123"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase())
                setError(null)
              }}
              maxLength={TRIP_CODE_LENGTH}
              className="text-center text-2xl tracking-widest uppercase font-mono h-14"
              autoComplete="off"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            disabled={isLoading || code.trim().length === 0}
          >
            {isLoading ? "Checking..." : "Join Trip"}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
