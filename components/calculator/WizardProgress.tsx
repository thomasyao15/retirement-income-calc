"use client"

import { useWizard } from "react-use-wizard"
import { useCalculatorStore } from "@/store/calculatorStore"
import { useEffect, useState } from "react"

export default function WizardProgress() {
  const { activeStep, stepCount } = useWizard()
  const { assets } = useCalculatorStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Calculate actual step count accounting for conditional questions
    const conditionalSteps = [
      assets.hasBankMoney,
      assets.hasShares,
      assets.hasInvestmentProperty,
      assets.hasIncomeStreams
    ].filter(Boolean).length

    // Base steps + conditional follow-ups
    const totalSteps = stepCount + conditionalSteps
    const currentStep = activeStep + 1

    // Calculate progress percentage
    const newProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100))
    setProgress(newProgress)
  }, [activeStep, stepCount, assets])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 h-2 z-50">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}