"use client"

import { useState, useEffect } from "react"

import QuestionLayout from "@/components/calculator/QuestionLayout"
import MultipleChoice from "@/components/calculator/inputs/MultipleChoice"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function Gender() {

  const { personalInfo, updatePersonalInfo, setCurrentStepValid } = useCalculatorStore()
  const [gender, setGender] = useState<string>(personalInfo.gender || "")

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ]

  useEffect(() => {
    const isValid = gender !== ""
    setCurrentStepValid(isValid)

    if (gender) {
      updatePersonalInfo({ gender: gender as 'male' | 'female' | 'other' })
    }
  }, [gender, updatePersonalInfo, setCurrentStepValid])

  return (
    <QuestionLayout
      question="What's your gender?"
      subtitle="This helps us provide more accurate retirement estimates"
    >
      <MultipleChoice
        options={options}
        value={gender}
        onChange={setGender}
        columns={3}
      />
    </QuestionLayout>
  )
}