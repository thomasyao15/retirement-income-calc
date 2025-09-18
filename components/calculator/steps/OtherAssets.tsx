"use client"

import { useState, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function OtherAssets() {
  const { nextStep } = useWizard()
  const { pensionData, updatePensionData } = useCalculatorStore()
  const [amount, setAmount] = useState(pensionData.otherAssets || 0)

  useEffect(() => {
    updatePensionData({ otherAssets: amount })
  }, [amount, updatePensionData])

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