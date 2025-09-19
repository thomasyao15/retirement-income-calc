"use client"

import { useEffect } from "react"
import TextDisplay from "@/components/calculator/TextDisplay"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function WelcomePage() {
  const { setCurrentStepValid } = useCalculatorStore()

  useEffect(() => {
    // Welcome page is always valid
    setCurrentStepValid(true)
  }, [setCurrentStepValid])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Welcome to your retirement journey"
        subtitle="Let's plan your future together"
        content="We'll ask you a few questions to understand your situation and help you make the best decisions for your retirement."
        highlight="Ready to get started?"
      />
    </div>
  )
}