"use client"

import { useState } from "react"
import { createTripWithPreferences } from "@/features/trips/trips"
import { WizardProgress } from "./wizard-steps/wizard-progress"
import { StepSetup } from "./wizard-steps/step-setup"
import { StepPreferences } from "./wizard-steps/step-preferences"
import { StepInvite } from "./wizard-steps/step-invite"

// Mock user ID - will be replaced with auth later
const MOCK_USER_ID = "11111111-1111-1111-1111-111111111111"

const STEPS = [
  { id: 1, name: "Setup" },
  { id: 2, name: "Preferences" },
  { id: 3, name: "Invite" },
]

type WizardStep = 1 | 2 | 3

interface DateRange {
  start_date: Date
  end_date: Date
}

interface CreatedTrip {
  trip_id: string
  code: string
  trip_name: string | null
}

export function CreateTripWizard() {
  const [step, setStep] = useState<WizardStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdTrip, setCreatedTrip] = useState<CreatedTrip | null>(null)

  // Form data
  const [tripName, setTripName] = useState("")
  const [destinations, setDestinations] = useState<string[]>([])
  const [availabilities, setAvailabilities] = useState<DateRange[]>([])
  const [maxCost, setMaxCost] = useState<number | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const result = await createTripWithPreferences({
        trip_name: tripName,
        starter_id: MOCK_USER_ID,
        destinations: destinations.length > 0 ? destinations : undefined,
        availabilities: availabilities.length > 0 ? availabilities : undefined,
        max_cost: maxCost ?? undefined,
      })
      setCreatedTrip(result)
      setStep(3)
    } catch (error) {
      console.error("Failed to create trip:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Progress indicator */}
      <WizardProgress currentStep={step} steps={STEPS} />

      {/* Steps */}
      {step === 1 && (
        <StepSetup
          tripName={tripName}
          onTripNameChange={setTripName}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepPreferences
          destinations={destinations}
          availabilities={availabilities}
          maxCost={maxCost}
          onDestinationsChange={setDestinations}
          onAvailabilitiesChange={setAvailabilities}
          onMaxCostChange={setMaxCost}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {step === 3 && createdTrip && (
        <StepInvite
          tripCode={createdTrip.code}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  )
}
