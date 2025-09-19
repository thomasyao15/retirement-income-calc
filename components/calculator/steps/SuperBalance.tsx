"use client"

import { useState, useEffect } from "react"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function SuperBalance() {
  const { personalInfo, updatePersonalInfo, setCurrentStepValid } = useCalculatorStore()
  const [balance, setBalance] = useState<number | undefined>(personalInfo.superBalance || undefined)

  useEffect(() => {
    const isValid = balance !== undefined && balance > 0
    setCurrentStepValid(isValid)

    if (balance !== undefined && balance >= 0) {
      updatePersonalInfo({ superBalance: balance })
    }
  }, [balance, updatePersonalInfo, setCurrentStepValid])

  return (
    <QuestionLayout
      question="What's your current super balance?"
      subtitle="Enter your approximate superannuation balance"
    >
      <CurrencyInput
        value={balance}
        onChange={setBalance}
        placeholder="500,000"
      />
    </QuestionLayout>
  )
}