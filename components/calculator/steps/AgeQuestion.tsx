"use client"

import { useState, useEffect } from "react"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import NumericInput from "@/components/calculator/inputs/NumericInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function AgeQuestion() {
  const { personalInfo, updatePersonalInfo, setCurrentStepValid } = useCalculatorStore()
  const [age, setAge] = useState(personalInfo.age)
  const [error, setError] = useState("")

  useEffect(() => {
    // Validate on mount and whenever age changes
    const isValid = age !== undefined && age >= 18 && age <= 120
    setCurrentStepValid(isValid)
  }, [age, setCurrentStepValid])

  const handleChange = (value: number | undefined) => {
    setAge(value)
    setError("")

    if (value !== undefined) {
      if (value < 18) {
        setError("You must be at least 18 years old")
        updatePersonalInfo({ age: undefined })
      } else if (value > 120) {
        setError("Please enter a valid age")
        updatePersonalInfo({ age: undefined })
      } else {
        updatePersonalInfo({ age: value })
      }
    } else {
      // Clear from store if undefined
      updatePersonalInfo({ age: undefined })
    }
  }

  return (
    <QuestionLayout
      question="What's your current age?"
      subtitle="This helps us calculate your retirement timeline"
    >
      <NumericInput
        value={age}
        onChange={handleChange}
        min={18}
        max={120}
        placeholder="65"
        error={error}
        autoFocus
      />
    </QuestionLayout>
  )
}