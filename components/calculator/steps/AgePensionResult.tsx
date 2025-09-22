"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/calculator/AnimatedCounter";
import { useCalculatorStore } from "@/store/calculatorStore";
import { calculateRetirementIncome } from "@/lib/calculationService";

export default function AgePensionResult() {
  const {
    setCalculations,
    calculations,
    personalInfo,
    assets,
    pensionData,
    setCurrentStepValid
  } = useCalculatorStore();

  useEffect(() => {
    // Result page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  useEffect(() => {
    console.group('🧮 AgePensionResult - Running Centralized Calculations');

    // Prepare data for calculation service
    const calculatorData = {
      // Personal Info
      age: personalInfo.age,
      gender: personalInfo.gender,
      retirementYears: personalInfo.retirementYears,
      expectedLongevity: personalInfo.expectedLongevity,
      superBalance: personalInfo.superBalance,
      relationshipStatus: personalInfo.relationshipStatus,

      // Assets
      hasBankMoney: assets.hasBankMoney,
      bankMoneyAmount: assets.bankMoneyAmount,
      hasShares: assets.hasShares,
      sharesValue: assets.sharesValue,
      hasInvestmentProperty: assets.hasInvestmentProperty,
      investmentPropertyValue: assets.investmentPropertyValue,
      hasIncomeStreams: assets.hasIncomeStreams,
      incomeStreamsAmount: assets.incomeStreamsAmount,

      // Pension Data
      homeOwnership: pensionData.homeOwnership,
      otherAssets: pensionData.otherAssets,
      combinedIncome: pensionData.combinedIncome
    };

    // Run centralized calculations
    const results = calculateRetirementIncome(calculatorData);

    // Store ALL results in the store for other components to use
    setCalculations({
      // Initial pension (before LTI)
      estimatedPension: results.initialPension,
      initialAssets: results.initialTotalAssets,

      // Adjusted values (after LTI)
      adjustedAssets: results.adjustedTotalAssets,
      adjustedPensionAmount: results.adjustedPension,
      incomeIncreaseWithAS: results.pensionIncrease,

      // Income streams
      lifetimeIncome: Math.round(results.lifetimeIncomeAnnual),
      choiceIncome: Math.round(results.choiceIncomeAnnual),

      // Totals
      totalRetirementIncome: Math.round(results.totalRetirementIncome),
      safetyNetAmount: Math.round(results.safetyNetAmount),

      // Product and eligibility
      pensionEligibility: results.eligibility,
      recommendedPreMix: results.recommendedProduct
    });

    console.log('✅ All calculations stored in state');
    console.groupEnd();
  }, [personalInfo, assets, pensionData, setCalculations]);

  const eligibilityText = {
    "not-eligible": "You're not currently eligible",
    partial: "You qualify for a partial Age Pension",
    full: "You qualify for the full Age Pension",
  };

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
          {eligibilityText[calculations.pensionEligibility || "partial"]}
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
          <p className="text-xl text-muted-foreground mt-4">per year</p>
        </motion.div>

        <motion.div
          className="p-6 bg-primary/10 border-2 border-primary rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-lg text-foreground">
            💡 With AustralianSuper's lifetime income product, you could
            increase this by up to 40%
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
