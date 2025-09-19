"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/calculator/AnimatedCounter";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
  calculatePension,
  annualToFortnightly,
  sumAssets,
  mapRelationshipStatus,
  getProductRecommendation
} from "@/lib/calculations";

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
    console.group('🧮 AgePensionResult - Initial Pension Calculation');
    console.log('=====================================');

    // Log input values
    console.group('📊 Input Values');
    console.table({
      'Age': personalInfo.age || 67,
      'Gender': personalInfo.gender,
      'Relationship': personalInfo.relationshipStatus,
      'Super Balance': `$${(personalInfo.superBalance || 0).toLocaleString()}`,
      'Home Ownership': pensionData.homeOwnership,
      'Combined Income (annual)': `$${(pensionData.combinedIncome || 0).toLocaleString()}`,
      'Other Assets': `$${(pensionData.otherAssets || 0).toLocaleString()}`
    });

    console.group('Asset Breakdown');
    console.table({
      'Bank Money': `$${(assets.bankMoneyAmount || 0).toLocaleString()}`,
      'Shares Value': `$${(assets.sharesValue || 0).toLocaleString()}`,
      'Investment Property': `$${(assets.investmentPropertyValue || 0).toLocaleString()}`
    });
    console.groupEnd();
    console.groupEnd();

    // Calculate total non-super assets
    const nonSuperAssets = sumAssets(assets) + (pensionData.otherAssets || 0);
    const totalAssets = nonSuperAssets + (personalInfo.superBalance || 0);

    console.group('🔢 Asset Calculations');
    console.log('Non-Super Assets:', `$${nonSuperAssets.toLocaleString()}`);
    console.log('Super Balance:', `$${(personalInfo.superBalance || 0).toLocaleString()}`);
    console.log('Total Assets:', `$${totalAssets.toLocaleString()}`);
    console.groupEnd();

    // Convert annual income to fortnightly
    const fortnightlyIncome = annualToFortnightly(pensionData.combinedIncome || 0);

    console.group('💰 Income Calculations');
    console.log('Annual Income:', `$${(pensionData.combinedIncome || 0).toLocaleString()}`);
    console.log('Fortnightly Income:', `$${fortnightlyIncome.toFixed(2)}`);
    console.groupEnd();

    // Calculate pension
    const pensionParams = {
      age: personalInfo.age || 67,
      relationshipStatus: mapRelationshipStatus(personalInfo.relationshipStatus),
      homeOwner: pensionData.homeOwnership === 'yes',
      incomePerFortnight: fortnightlyIncome,
      totalAssets: totalAssets
    };

    console.group('🏛️ Pension Parameters');
    console.table(pensionParams);
    console.groupEnd();

    const result = calculatePension(pensionParams);

    console.group('📈 Pension Calculation Results');
    console.table({
      'Income Test Pension': `$${result.incomeTestPension.toFixed(2)}/year`,
      'Asset Test Pension': `$${result.assetTestPension.toFixed(2)}/year`,
      'Final Pension (lower of two)': `$${result.finalPension.toFixed(2)}/year`,
      'Pension Percentage': `${result.pensionPercentage.toFixed(1)}%`,
      'Eligibility': result.eligibility
    });
    console.groupEnd();

    // Get product recommendation
    const recommendedProduct = getProductRecommendation(result.pensionPercentage);

    console.group('🎯 Product Recommendation');
    console.log('Pension Percentage:', `${result.pensionPercentage.toFixed(1)}%`);
    console.log('Recommended Product:', recommendedProduct);
    console.groupEnd();

    // Store the INITIAL pension (before LTI discount)
    setCalculations({
      estimatedPension: result.finalPension,
      pensionEligibility: result.eligibility,
      recommendedPreMix: recommendedProduct,
      // Store initial pension for comparison later
      incomeIncreaseWithAS: 0  // Will be calculated after LTI discount
    });

    console.log('✅ Stored initial pension:', `$${result.finalPension.toFixed(2)}/year`);
    console.groupEnd();
    console.log('=====================================\n');
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
