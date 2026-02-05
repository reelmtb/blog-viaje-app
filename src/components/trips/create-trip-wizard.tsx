"use client"

import { useState } from "react"
import { createTripWithPreferences } from "@/features/trips/trips"
import { DateRange, CreatedTrip } from "@/features/trips/types"
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

export function CreateTripWizard() {
  const [step, setStep] = useState<WizardStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdTrip, setCreatedTrip] = useState<CreatedTrip | null>(null)

  // Form data
  const [tripName, setTripName] = useState("")
  const [destinations, setDestinations] = useState<string[]>([])
  const [availabilities, setAvailabilities] = useState<DateRange[]>([])
  const [maxCost, setMaxCost] = useState<number | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
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
    } catch (err) {
      console.error("Failed to create trip:", err)
      setError("Failed to create trip. Please try again.")
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
          error={error}
        />
      )}

      {step === 3 && createdTrip && (
        <StepInvite tripCode={createdTrip.code} />
      )}
    </div>
  )
}
