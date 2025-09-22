"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/calculator/AnimatedCounter";
import IncomeBreakdownChart from "@/components/calculator/IncomeBreakdownChart";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function FinalIncomeDisplay() {
  const {
    calculations,
    setCurrentStepValid
  } = useCalculatorStore();

  useEffect(() => {
    // Display page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  useEffect(() => {
    console.group('📊 FinalIncomeDisplay - Using Pre-Calculated Values');
    console.log('Total Retirement Income:', `$${(calculations.totalRetirementIncome || 0).toLocaleString()}/year`);
    console.log('Choice Income:', `$${(calculations.choiceIncome || 0).toLocaleString()}/year`);
    console.log('Lifetime Income:', `$${(calculations.lifetimeIncome || 0).toLocaleString()}/year`);
    console.log('Adjusted Pension:', `$${(calculations.adjustedPensionAmount || 0).toLocaleString()}/year`);
    console.log('Pension Increase:', `$${(calculations.incomeIncreaseWithAS || 0).toLocaleString()}/year`);
    console.groupEnd();
  }, [calculations]);

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
          Here's your total retirement income
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          With AustralianSuper Pre-Mix Option {calculations.recommendedPreMix}
        </motion.p>

        <motion.div
          className="py-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* <p className="text-lg text-muted-foreground mb-4">
            Your total annual retirement income
          </p> */}
          <AnimatedCounter
            value={calculations.totalRetirementIncome || 0}
            delay={1000}
            formatAsCurrency={true}
            decimals={0}
            className="text-7xl md:text-8xl"
          />
          <p className="text-xl text-muted-foreground mt-4">every year</p>
        </motion.div>

        <motion.div
          className="bg-card border-2 border-border rounded-3xl p-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Income Breakdown</h2>
          <IncomeBreakdownChart
            lifetimeIncome={calculations.lifetimeIncome || 0}
            choiceIncome={calculations.choiceIncome || 0}
            agePension={calculations.adjustedPensionAmount || 0}
          />
        </motion.div>

        <motion.div
          className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary rounded-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-xl font-bold text-foreground mb-2">
            🎉 That's $
            {(calculations.incomeIncreaseWithAS || 0).toLocaleString("en-AU")}{" "}
            more per year
          </p>
          <p className="text-lg text-muted-foreground">
            Thanks to AustralianSuper's lifetime income discount on the Age
            Pension means test
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
