"use client"

import { useState, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import YesNoChoice from "@/components/calculator/inputs/YesNoChoice"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function HomeOwnership() {
  const { nextStep } = useWizard()
  const { pensionData, updatePensionData, setCurrentStepValid } = useCalculatorStore()
  const [ownsHome, setOwnsHome] = useState<boolean | undefined>(
    pensionData.homeOwnership === 'yes' ? true :
    pensionData.homeOwnership === 'no' ? false : undefined
  )

  useEffect(() => {
    // Valid only if user has selected yes or no
    const isValid = ownsHome !== undefined
    setCurrentStepValid(isValid)

    if (ownsHome !== undefined) {
      updatePensionData({ homeOwnership: ownsHome ? 'yes' : 'no' })
    }
  }, [ownsHome, updatePensionData, setCurrentStepValid])

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