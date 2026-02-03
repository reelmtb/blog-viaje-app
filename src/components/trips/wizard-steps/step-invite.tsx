"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckIcon, CopyIcon, CheckCircleIcon, ArrowLeftIcon, HomeIcon } from "lucide-react"

interface StepInviteProps {
  tripCode: string
  onBack: () => void
}

export function StepInvite({ tripCode, onBack }: StepInviteProps) {
  const router = useRouter()
  const [copied, setCopied] = useState<"link" | "code" | null>(null)

  const tripLink = typeof window !== "undefined"
    ? `${window.location.origin}/trip/${tripCode}`
    : ""

  const copyToClipboard = async (text: string, type: "link" | "code") => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
            <CheckCircleIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Your trip is ready!
          </h1>
          <p className="text-lg text-muted-foreground">
            Share this link with your travel group to get their input
          </p>
        </div>
      </div>

      {/* Invite Info */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        {/* Trip Code */}
        <div className="space-y-2">
          <Label>Trip Code</Label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-lg px-4 py-3 font-mono text-2xl font-bold tracking-widest text-center">
              {tripCode}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(tripCode, "code")}
            >
              {copied === "code" ? (
                <CheckIcon className="h-4 w-4 text-green-600" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Invite Link */}
        <div className="space-y-2">
          <Label>Invite Link</Label>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={tripLink}
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(tripLink, "link")}
            >
              {copied === "link" ? (
                <CheckIcon className="h-4 w-4 text-green-600" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* What's next */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What happens next?</h3>
        <div className="space-y-3">
          <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              1
            </div>
            <div>
              <p className="font-medium">Your friends join and add preferences</p>
              <p className="text-sm text-muted-foreground">
                They&apos;ll vote on destinations, add their dates, and set their budget
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              2
            </div>
            <div>
              <p className="font-medium">View the trip dashboard</p>
              <p className="text-sm text-muted-foreground">
                See everyone&apos;s preferences, vote counts, and overlapping dates
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              3
            </div>
            <div>
              <p className="font-medium">Decide together</p>
              <p className="text-sm text-muted-foreground">
                Use the insights to pick the destination and dates that work best
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30"
          onClick={() => router.push(`/trip/${tripCode}`)}
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Go to Trip
        </Button>
      </div>
    </div>
  )
}
