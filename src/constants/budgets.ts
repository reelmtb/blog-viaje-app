export const BUDGET_PRESETS = [
  { value: 500, label: "$500" },
  { value: 1000, label: "$1,000" },
  { value: 2000, label: "$2,000" },
  { value: 3000, label: "$3,000" },
  { value: 5000, label: "$5,000" },
  { value: 10000, label: "$10,000+" },
] as const

export type BudgetPreset = (typeof BUDGET_PRESETS)[number]
