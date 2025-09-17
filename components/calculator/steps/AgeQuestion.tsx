"use client"

import { useState } from "react"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import NumericInput from "@/components/calculator/inputs/NumericInput"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function AgeQuestion() {
  const { personalInfo, updatePersonalInfo } = useCalculatorStore()
  const [age, setAge] = useState(personalInfo.age)
  const [error, setError] = useState("")

  const handleChange = (value: number | undefined) => {
    setAge(value)
    setError("")

    if (value !== undefined) {
      if (value < 18) {
        setError("You must be at least 18 years old")
      } else if (value > 120) {
        setError("Please enter a valid age")
      } else {
        updatePersonalInfo({ age: value })
      }
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