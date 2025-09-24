"use client"

import { useState, useEffect } from "react"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function CombinedIncome() {
  const { pensionData, updatePensionData, personalInfo, setCurrentStepValid } = useCalculatorStore()
  const [income, setIncome] = useState<number | undefined>(
    pensionData.combinedIncome !== undefined ? pensionData.combinedIncome : undefined
  )

  const isCouple = personalInfo.relationshipStatus === "married" || personalInfo.relationshipStatus === "defacto"

  useEffect(() => {
    // Valid if income is defined and 0 or greater
    const isValid = income !== undefined && income >= 0
    setCurrentStepValid(isValid)

    if (income !== undefined) {
      updatePensionData({ combinedIncome: income })
    }
  }, [income, updatePensionData, setCurrentStepValid])

  return (
    <QuestionLayout
      question={isCouple ? "What's your combined annual income?" : "What's your annual income?"}
      subtitle="Include employment, rental income, dividends, and other regular income"
    >
      <div className="space-y-4">
        <CurrencyInput
          value={income}
          onChange={setIncome}
          placeholder="0"
        />
        <p className="text-lg text-muted-foreground text-center">per year</p>
      </div>
    </QuestionLayout>
  )
}