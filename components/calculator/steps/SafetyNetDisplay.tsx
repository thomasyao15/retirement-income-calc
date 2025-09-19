"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/calculator/AnimatedCounter";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
  getAllocationByProduct,
  calculateAdjustedPension,
  calculateLifetimeIncomeAnnual,
  annualToFortnightly,
  sumAssets,
  mapRelationshipStatus
} from "@/lib/calculations";

export default function SafetyNetDisplay() {
  const {
    setCalculations,
    calculations,
    personalInfo,
    assets,
    pensionData,
    setCurrentStepValid
  } = useCalculatorStore();

  useEffect(() => {
    // Display page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  useEffect(() => {
    // Only calculate if we haven't already set safety net amount
    if (!calculations.safetyNetAmount) {
      console.group('🛡️ SafetyNetDisplay - Lifetime Income Calculation');
      console.log('=====================================');

      const superBalance = personalInfo.superBalance || 500000;
      const product = calculations.recommendedPreMix || 'B';

      console.group('📊 Starting Values');
      console.table({
        'Super Balance': `$${superBalance.toLocaleString()}`,
        'Recommended Product': product,
        'Initial Pension (before LTI)': `$${(calculations.estimatedPension || 0).toFixed(2)}/year`,
        'Age': personalInfo.age || 67
      });
      console.groupEnd();

      // Get allocation based on product recommendation
      const allocation = getAllocationByProduct(product, superBalance);

      console.group('💼 Product Allocation');
      console.table({
        'Choice Income %': `${allocation.choicePercent}%`,
        'Lifetime Income %': `${allocation.lifetimePercent}%`,
        'Choice Amount': `$${allocation.choiceAmount.toLocaleString()}`,
        'Lifetime Amount': `$${allocation.lifetimeAmount.toLocaleString()}`
      });
      console.groupEnd();

      // Calculate adjusted pension with lifetime income discount
      const nonSuperAssets = sumAssets(assets) + (pensionData.otherAssets || 0);
      const totalAssets = nonSuperAssets + superBalance;
      const fortnightlyIncome = annualToFortnightly(pensionData.combinedIncome || 0);

      console.group('🏦 Asset Recalculation for LTI Discount');
      console.log('Original Total Assets:', `$${totalAssets.toLocaleString()}`);
      console.log('Lifetime Income Amount:', `$${allocation.lifetimeAmount.toLocaleString()}`);
      console.log('40% Discount Amount:', `$${(allocation.lifetimeAmount * 0.4).toLocaleString()}`);
      console.log('Adjusted Total Assets:', `$${(totalAssets - allocation.lifetimeAmount * 0.4).toLocaleString()}`);
      console.groupEnd();

      const adjustedPensionResult = calculateAdjustedPension({
        age: personalInfo.age || 67,
        relationshipStatus: mapRelationshipStatus(personalInfo.relationshipStatus),
        homeOwner: pensionData.homeOwnership === 'yes',
        incomePerFortnight: fortnightlyIncome,
        totalAssets: totalAssets
      }, allocation.lifetimeAmount);

      console.group('📈 Adjusted Pension Results');
      console.table({
        'Income Test Pension': `$${adjustedPensionResult.incomeTestPension.toFixed(2)}/year`,
        'Asset Test Pension': `$${adjustedPensionResult.assetTestPension.toFixed(2)}/year`,
        'Final Adjusted Pension': `$${adjustedPensionResult.finalPension.toFixed(2)}/year`,
        'Pension Percentage': `${adjustedPensionResult.pensionPercentage.toFixed(1)}%`
      });
      console.groupEnd();

      // Calculate lifetime income annual payment
      const annualLifetimeIncome = calculateLifetimeIncomeAnnual(
        allocation.lifetimeAmount,
        personalInfo.age || 67
      );

      console.group('💰 Lifetime Income Calculation');
      console.log('Lifetime Amount:', `$${allocation.lifetimeAmount.toLocaleString()}`);
      console.log('Rate (6.7%):', '0.067');
      console.log('Annual Lifetime Income:', `$${annualLifetimeIncome.toFixed(2)}`);
      console.groupEnd();

      // Safety net = lifetime income + adjusted age pension
      const safetyNet = Math.round(annualLifetimeIncome + adjustedPensionResult.finalPension);

      // Calculate the pension increase from LTI discount
      const initialPension = calculations.estimatedPension || 0;
      const adjustedPension = Math.round(adjustedPensionResult.finalPension);
      const pensionIncrease = adjustedPension - initialPension;

      console.group('🎯 Final Safety Net Calculation');
      console.table({
        'Initial Pension (no LTI)': `$${initialPension.toFixed(2)}/year`,
        'Adjusted Pension (with LTI)': `$${adjustedPension}/year`,
        'Pension Increase': `$${pensionIncrease}/year`,
        'Lifetime Income': `$${Math.round(annualLifetimeIncome)}/year`,
        'Total Safety Net': `$${safetyNet}/year`
      });
      console.groupEnd();

      setCalculations({
        lifetimeIncome: Math.round(annualLifetimeIncome),
        safetyNetAmount: safetyNet,
        adjustedPensionAmount: adjustedPension,  // Store the adjusted pension amount
        incomeIncreaseWithAS: pensionIncrease
      });

      console.log('✅ Stored calculations complete');
      console.groupEnd();
      console.log('=====================================\n');
    }
  }, [
    calculations.safetyNetAmount,
    calculations.recommendedPreMix,
    personalInfo,
    assets,
    pensionData,
    setCalculations
  ]);

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
            duration={2500}
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
              ${(calculations.adjustedPensionAmount || (calculations.estimatedPension || 0) + (calculations.incomeIncreaseWithAS || 0)).toLocaleString("en-AU")}
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
