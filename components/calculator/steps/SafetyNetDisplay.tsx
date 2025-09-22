"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/calculator/AnimatedCounter";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function SafetyNetDisplay() {
  const {
    calculations,
    setCurrentStepValid
  } = useCalculatorStore();

  useEffect(() => {
    // Display page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  useEffect(() => {
    console.group('🛡️ SafetyNetDisplay - Using Pre-Calculated Values');
    console.log('Safety Net Amount:', `$${(calculations.safetyNetAmount || 0).toLocaleString()}/year`);
    console.log('Lifetime Income:', `$${(calculations.lifetimeIncome || 0).toLocaleString()}/year`);
    console.log('Adjusted Pension:', `$${(calculations.adjustedPensionAmount || 0).toLocaleString()}/year`);
    console.log('Pension Increase:', `$${(calculations.incomeIncreaseWithAS || 0).toLocaleString()}/year`);
    console.groupEnd();
  }, [calculations]);

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
          Your Lifetime Safety Net
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Guaranteed income for the rest of your life
        </motion.p>

        <motion.div
          className="py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Your guaranteed annual income
          </p>
          <AnimatedCounter
            value={calculations.safetyNetAmount || 0}
            delay={2500}
            formatAsCurrency={true}
            decimals={0}
          />
          <p className="text-xl text-muted-foreground mt-4">
            every year, for life
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="p-6 bg-card border-2 border-border rounded-2xl">
            <p className="text-lg font-semibold mb-2">Lifetime Income</p>
            <p className="text-2xl font-bold text-primary">
              ${(calculations.lifetimeIncome || 0).toLocaleString("en-AU")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">per year</p>
          </div>
          <div className="p-6 bg-card border-2 border-border rounded-2xl">
            <p className="text-lg font-semibold mb-2">Age Pension</p>
            <p className="text-2xl font-bold text-primary">
              ${(calculations.adjustedPensionAmount || 0).toLocaleString("en-AU")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">per year</p>
          </div>
        </motion.div>

        <motion.div
          className="p-6 bg-primary/10 border-2 border-primary rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <p className="text-lg text-foreground">
            ✨ This income is guaranteed for life, even if your investments run
            out
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
