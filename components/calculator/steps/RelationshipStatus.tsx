"use client"

import { useState, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import MultipleChoice from "@/components/calculator/inputs/MultipleChoice"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function RelationshipStatus() {
  const { nextStep } = useWizard()
  const { personalInfo, updatePersonalInfo, setCurrentStepValid } = useCalculatorStore()
  const [status, setStatus] = useState<string>(personalInfo.relationshipStatus || "")

  const options = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "defacto", label: "De Facto" },
    { value: "divorced", label: "Divorced" }
  ]

  useEffect(() => {
    const isValid = status !== undefined && status !== ""
    setCurrentStepValid(isValid)

    if (status) {
      updatePersonalInfo({ relationshipStatus: status })
    }
  }, [status, updatePersonalInfo, setCurrentStepValid])

  return (
    <QuestionLayout
      question="What's your relationship status?"
      subtitle="This helps us calculate your Age Pension eligibility"
    >
      <MultipleChoice
        options={options}
        value={status}
        onChange={setStatus}
        columns={2}
      />
    </QuestionLayout>
  )
}