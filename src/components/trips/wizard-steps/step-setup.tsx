import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightIcon } from "lucide-react"

interface StepSetupProps {
  tripName: string
  onTripNameChange: (name: string) => void
  onNext: () => void
}

export function StepSetup({ tripName, onTripNameChange, onNext }: StepSetupProps) {
  const canProceed = tripName.trim().length > 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Your Trip</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Let&apos;s start by giving your trip a name
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="trip-name" className="text-base font-medium">
            Trip Name
          </Label>
          <Input
            id="trip-name"
            type="text"
            placeholder="e.g., Summer Europe Adventure"
            value={tripName}
            onChange={(e) => onTripNameChange(e.target.value)}
            className="text-lg h-12"
          />
          <p className="text-sm text-muted-foreground">
            Give your trip a memorable name that everyone will recognize
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Link href="/">
          <Button variant="ghost">Cancel</Button>
        </Link>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none"
        >
          Continue
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
