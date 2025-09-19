"use client"

import { useState, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function OtherAssets() {
  const { nextStep } = useWizard()
  const { pensionData, updatePensionData, setCurrentStepValid } = useCalculatorStore()
  const [amount, setAmount] = useState<number | undefined>(
    pensionData.otherAssets !== undefined ? pensionData.otherAssets : undefined
  )

  useEffect(() => {
    // Valid if amount is defined and 0 or greater
    const isValid = amount !== undefined && amount >= 0
    setCurrentStepValid(isValid)

    if (amount !== undefined) {
      updatePensionData({ otherAssets: amount })
    }
  }, [amount, updatePensionData, setCurrentStepValid])

  return (
    <QuestionLayout
      question="Do you have any other assets?"
      subtitle="Include vehicles, boats, collectibles, and other valuable items"
    >
      <CurrencyInput
        value={amount}
        onChange={setAmount}
        placeholder="0"
      />
    </QuestionLayout>
  )
}