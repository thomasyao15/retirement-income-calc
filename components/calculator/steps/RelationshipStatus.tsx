"use client"

import { useState } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import MultipleChoice from "@/components/calculator/inputs/MultipleChoice"

export default function RelationshipStatus() {
  const { nextStep } = useWizard()
  const [status, setStatus] = useState<string>()

  const options = [
    { value: "single", label: "Single", color: "bg-blue-500" },
    { value: "married", label: "Married", color: "bg-pink-500" },
    { value: "defacto", label: "De Facto", color: "bg-purple-500" },
    { value: "divorced", label: "Divorced", color: "bg-orange-500" }
  ]

  return (
    <QuestionLayout
      question="What's your relationship status?"
      subtitle="This helps us calculate your Age Pension eligibility"
    >
      <MultipleChoice
        options={options}
        value={status}
        onChange={(value) => {
          setStatus(value)
          setTimeout(() => nextStep(), 500)
        }}
        columns={2}
      />
    </QuestionLayout>
  )
}