import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
}

interface WizardProgressProps {
  currentStep: number
  steps: Step[]
}

export function WizardProgress({ currentStep, steps }: WizardProgressProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li
            key={step.id}
            className={cn(
              "relative flex-1",
              stepIdx !== steps.length - 1 && "pr-8 sm:pr-20"
            )}
          >
            {/* Connector line */}
            {stepIdx !== steps.length - 1 && (
              <div
                className="absolute top-4 left-0 -ml-px mt-0.5 h-0.5 w-full"
                aria-hidden="true"
              >
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    step.id < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              </div>
            )}

            <div className="group relative flex flex-col items-start">
              <span className="flex h-9 items-center" aria-hidden="true">
                <span
                  className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                    step.id < currentStep &&
                      "border-primary bg-primary text-primary-foreground",
                    step.id === currentStep &&
                      "border-primary bg-background text-primary",
                    step.id > currentStep &&
                      "border-border bg-background text-muted-foreground"
                  )}
                >
                  {step.id < currentStep ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </span>
              </span>
              <span className="mt-2 flex min-w-0 flex-col">
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    step.id <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
