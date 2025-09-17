"use client"

import { Wizard } from "react-use-wizard"
import { AnimatePresence } from "framer-motion"
import WizardFooter from "@/components/calculator/WizardFooter"
import AnimationWrapper from "@/components/calculator/AnimationWrapper"
import AgeQuestion from "@/components/calculator/steps/AgeQuestion"
import RetirementYears from "@/components/calculator/steps/RetirementYears"

export default function CalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <AnimatePresence mode="wait">
        <Wizard
          wrapper={<AnimationWrapper />}
          footer={<WizardFooter />}
        >
          {/* Step 1: Age Question */}
          <AgeQuestion />

          {/* Step 2: Retirement Years */}
          <RetirementYears />
        </Wizard>
      </AnimatePresence>
    </div>
  )
}