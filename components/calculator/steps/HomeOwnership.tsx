"use client"

import { useState } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import YesNoChoice from "@/components/calculator/inputs/YesNoChoice"

export default function HomeOwnership() {
  const { nextStep } = useWizard()
  const [ownsHome, setOwnsHome] = useState<boolean>()

  return (
    <QuestionLayout
      question="Do you own your own home?"
      subtitle="Home ownership affects your Age Pension eligibility"
    >
      <YesNoChoice
        value={ownsHome}
        onChange={setOwnsHome}
      />
    </QuestionLayout>
  )
}