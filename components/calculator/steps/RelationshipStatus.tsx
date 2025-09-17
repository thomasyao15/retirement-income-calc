"use client"

import { useState } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import MultipleChoice from "@/components/calculator/inputs/MultipleChoice"

export default function RelationshipStatus() {
  const { nextStep } = useWizard()
  const [status, setStatus] = useState<string>()

  const options = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "defacto", label: "De Facto" },
    { value: "divorced", label: "Divorced" }
  ]

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