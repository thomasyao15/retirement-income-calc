"use client"

import { useState, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function TotalAssets() {
  const { nextStep } = useWizard()
  const { personalInfo, updatePersonalInfo, setCurrentStepValid } = useCalculatorStore()
  const [amount, setAmount] = useState<number | undefined>(
    personalInfo.totalAssets !== undefined ? personalInfo.totalAssets : undefined
  )

  useEffect(() => {
    // Valid if amount is defined and 0 or greater
    const isValid = amount !== undefined && amount >= 0
    setCurrentStepValid(isValid)

    if (amount !== undefined) {
      updatePersonalInfo({ totalAssets: amount })
    }
  }, [amount, updatePersonalInfo, setCurrentStepValid])

  return (
    <QuestionLayout
      question="What are your total assets outside of super?"
      subtitle="Include bank accounts, shares, investment properties, vehicles, collectibles, and any other valuable assets you own"
    >
      <CurrencyInput
        value={amount}
        onChange={setAmount}
        placeholder="0"
      />
    </QuestionLayout>
  )
}