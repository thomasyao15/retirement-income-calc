"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedCounter from "@/components/calculator/AnimatedCounter"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function AgePensionResult() {
  const { setCalculations, calculations, personalInfo } = useCalculatorStore()

  useEffect(() => {
    // Dummy calculation for now
    const dummyPension = 28976 // Example amount
    const eligibility = dummyPension > 20000 ? 'partial' : dummyPension > 0 ? 'partial' : 'not-eligible'

    setCalculations({
      estimatedPension: dummyPension,
      pensionEligibility: eligibility as 'not-eligible' | 'partial' | 'full'
    })
  }, [setCalculations])

  const eligibilityText = {
    'not-eligible': "You're not currently eligible",
    'partial': "You qualify for a partial Age Pension",
    'full': "You qualify for the full Age Pension"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Great news!
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {eligibilityText[calculations.pensionEligibility || 'partial']}
        </motion.p>

        <motion.div
          className="py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Your estimated Age Pension is
          </p>
          <AnimatedCounter
            value={calculations.estimatedPension || 0}
            duration={2000}
            formatAsCurrency={true}
            decimals={0}
          />
          <p className="text-xl text-muted-foreground mt-4">
            per year
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-primary/10 border-2 border-primary rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-lg text-foreground">
            💡 With Australian Super's lifetime income product, you could increase this by up to 40%
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}