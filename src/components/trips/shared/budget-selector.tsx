"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSignIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { BUDGET_PRESETS } from "@/constants/budgets"
import { formatCurrency } from "@/lib/formatters"

interface BudgetSelectorProps {
  budget: number | null
  onBudgetChange: (budget: number | null) => void
}

export function BudgetSelector({ budget, onBudgetChange }: BudgetSelectorProps) {
  const [customBudget, setCustomBudget] = useState("")

  const handlePresetSelect = (value: number) => {
    setCustomBudget("")
    onBudgetChange(budget === value ? null : value)
  }

  const handleCustomBudgetChange = (value: string) => {
    setCustomBudget(value)
    const numValue = parseInt(value.replace(/[^0-9]/g, ""))
    if (!isNaN(numValue) && numValue > 0) {
      onBudgetChange(numValue)
    } else if (value === "") {
      onBudgetChange(null)
    }
  }

  const isPresetSelected = budget !== null && BUDGET_PRESETS.some((p) => p.value === budget)

  return (
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
                budget === preset.value && isPresetSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background"
              )}
            >
              <DollarSignIcon
                className={cn(
                  "h-5 w-5 mb-2",
                  budget === preset.value && isPresetSelected
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "font-semibold",
                  budget === preset.value && isPresetSelected
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
      {budget && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Maximum budget per person
            </span>
            <span className="text-lg font-semibold text-foreground">
              {formatCurrency(budget)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
