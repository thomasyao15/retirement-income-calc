"use client"

import { useState } from "react"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import NumericInput from "@/components/calculator/inputs/NumericInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function RetirementYears() {
  const { personalInfo, updatePersonalInfo } = useCalculatorStore()
  const [years, setYears] = useState(personalInfo.retirementYears)
  const [error, setError] = useState("")

  const handleChange = (value: number | undefined) => {
    setYears(value)
    setError("")

    if (value !== undefined) {
      if (value < 0) {
        setError("Please enter a positive number")
      } else if (value > 50) {
        setError("Please enter a realistic timeframe")
      } else {
        updatePersonalInfo({ retirementYears: value })
      }
    }
  }

  return (
    <QuestionLayout
      question="In how many years do you plan to retire?"
      subtitle="We'll use this to project your retirement savings"
    >
      <NumericInput
        value={years}
        onChange={handleChange}
        min={0}
        max={50}
        placeholder="5"
        error={error}
        autoFocus
      />
    </QuestionLayout>
  )
}