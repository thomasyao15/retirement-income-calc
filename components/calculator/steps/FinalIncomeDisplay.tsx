"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedCounter from "@/components/calculator/AnimatedCounter"
import IncomeBreakdownChart from "@/components/calculator/IncomeBreakdownChart"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function FinalIncomeDisplay() {
  const { setCalculations, calculations, personalInfo } = useCalculatorStore()

  useEffect(() => {
    // Only calculate if we haven't already set these values
    if (!calculations.lifetimeIncome) {
      // Dummy calculations for demonstration
      const lifetimeIncome = 18500
      const choiceIncome = 25000
      const agePension = calculations.estimatedPension || 28976
      const agePensionWithAS = agePension * 1.4 // 40% increase with AS
      const totalIncome = lifetimeIncome + choiceIncome + agePensionWithAS

      setCalculations({
        lifetimeIncome,
        choiceIncome,
        estimatedPension: agePensionWithAS,
        totalRetirementIncome: totalIncome,
        incomeIncreaseWithAS: agePensionWithAS - agePension,
        recommendedPreMix: 'B' // Example pre-mix option
      })
    }
  }, []) // Empty dependency array - only run once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
      <motion.div
        className="text-center space-y-8 max-w-6xl w-full"
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
          Here's your retirement income
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          With Australian Super Pre-Mix Option {calculations.recommendedPreMix}
        </motion.p>

        <motion.div
          className="py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Your total annual retirement income
          </p>
          <AnimatedCounter
            value={calculations.totalRetirementIncome || 0}
            duration={3000}
            formatAsCurrency={true}
            decimals={0}
            className="text-7xl md:text-8xl"
          />
          <p className="text-xl text-muted-foreground mt-4">
            every year for life
          </p>
        </motion.div>

        <motion.div
          className="bg-card border-2 border-border rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Income Breakdown</h2>
          <IncomeBreakdownChart
            lifetimeIncome={calculations.lifetimeIncome || 0}
            choiceIncome={calculations.choiceIncome || 0}
            agePension={calculations.estimatedPension || 0}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="p-6 bg-card border-2 border-green-500 rounded-2xl">
            <p className="text-lg font-semibold mb-2">Lifetime Income</p>
            <p className="text-2xl font-bold text-green-600">
              ${(calculations.lifetimeIncome || 0).toLocaleString('en-AU')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Guaranteed for life</p>
          </div>
          <div className="p-6 bg-card border-2 border-blue-500 rounded-2xl">
            <p className="text-lg font-semibold mb-2">Choice Income</p>
            <p className="text-2xl font-bold text-blue-600">
              ${(calculations.choiceIncome || 0).toLocaleString('en-AU')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Flexible access</p>
          </div>
          <div className="p-6 bg-card border-2 border-amber-500 rounded-2xl">
            <p className="text-lg font-semibold mb-2">Age Pension</p>
            <p className="text-2xl font-bold text-amber-600">
              ${(calculations.estimatedPension || 0).toLocaleString('en-AU')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              +${(calculations.incomeIncreaseWithAS || 0).toLocaleString('en-AU')} with AS
            </p>
          </div>
        </motion.div>

        <motion.div
          className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-xl font-bold text-foreground mb-2">
            🎉 That's ${(calculations.incomeIncreaseWithAS || 0).toLocaleString('en-AU')} more per year
          </p>
          <p className="text-lg text-muted-foreground">
            Thanks to Australian Super's lifetime income discount on the Age Pension means test
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}