"use client"

import { useState, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function CombinedIncome() {
  const { nextStep } = useWizard()
  const { pensionData, updatePensionData, personalInfo } = useCalculatorStore()
  const [income, setIncome] = useState(pensionData.combinedIncome || 0)

  const isCouple = personalInfo.relationshipStatus === "married" || personalInfo.relationshipStatus === "defacto"

  useEffect(() => {
    updatePensionData({ combinedIncome: income })
  }, [income, updatePensionData])

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