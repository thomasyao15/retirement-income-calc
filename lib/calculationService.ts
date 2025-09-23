/**
 * Centralized calculation service for retirement income calculations
 * This service ensures consistent calculations across all components
 */

import {
  calculatePension,
  getProductRecommendation,
  getAllocationByProduct,
  calculateLifetimeIncomeDiscount,
  calculateLifetimeIncomeAnnual,
  calculateAnnualChoiceIncome,
  annualToFortnightly,
  mapRelationshipStatus,
  type PensionParams,
  type AllocationResult
} from './calculations';

export interface CalculatorData {
  // Personal Info
  age?: number;
  gender?: 'male' | 'female' | 'other';
  retirementYears?: number;
  expectedLongevity?: number;
  superBalance?: number;
  relationshipStatus?: string;
  totalAssets?: number;

  // Assets
  hasIncomeStreams?: boolean;
  incomeStreamsAmount?: number;

  // Pension Data
  homeOwnership?: string;
  combinedIncome?: number;
}

export interface RetirementCalculationResults {
  // Asset calculations
  nonSuperAssets: number;
  initialTotalAssets: number;
  adjustedTotalAssets: number;
  assetReduction: number;

  // Income calculations
  totalAnnualIncome: number;
  fortnightlyIncome: number;

  // Initial pension (before LTI discount)
  initialPension: number;
  initialIncomeTestPension: number;
  initialAssetTestPension: number;

  // Adjusted pension (after LTI discount)
  adjustedPension: number;
  adjustedIncomeTestPension: number;
  adjustedAssetTestPension: number;
  pensionIncrease: number;
  pensionIncreasePercentage: number;

  // Product allocation
  recommendedProduct: 'A' | 'B' | 'C' | 'D';
  allocation: AllocationResult;

  // Income streams
  lifetimeIncomeAnnual: number;
  choiceIncomeAnnual: number;

  // Total income
  safetyNetAmount: number; // Lifetime income + adjusted pension
  totalRetirementIncome: number; // All income sources combined

  // Eligibility
  eligibility: 'not-eligible' | 'partial' | 'full';
  pensionPercentage: number;
}

/**
 * Main calculation function that performs all retirement income calculations
 * This is the single source of truth for all calculations
 */
export function calculateRetirementIncome(data: CalculatorData): RetirementCalculationResults {
  console.group('💎 CENTRALIZED CALCULATION SERVICE');
  console.log('=====================================');

  // 1. Calculate total assets
  const nonSuperAssets = data.totalAssets || 0;
  const superBalance = data.superBalance || 0;
  const initialTotalAssets = nonSuperAssets + superBalance;

  console.group('📊 Asset Calculations');
  console.log('Non-Super Assets:', `$${nonSuperAssets.toLocaleString()}`);
  console.log('Super Balance:', `$${superBalance.toLocaleString()}`);
  console.log('Initial Total Assets:', `$${initialTotalAssets.toLocaleString()}`);
  console.groupEnd();

  // 2. Calculate total income (combining ALL income sources)
  const incomeStreamsAnnual = data.hasIncomeStreams ? (data.incomeStreamsAmount || 0) : 0;
  const combinedIncomeAnnual = data.combinedIncome || 0;
  const totalAnnualIncome = incomeStreamsAnnual + combinedIncomeAnnual;
  const fortnightlyIncome = annualToFortnightly(totalAnnualIncome);

  console.group('💰 Income Calculations');
  console.log('Income Streams (Section 1):', `$${incomeStreamsAnnual.toLocaleString()}/year`);
  console.log('Combined Income (Section 2):', `$${combinedIncomeAnnual.toLocaleString()}/year`);
  console.log('Total Annual Income:', `$${totalAnnualIncome.toLocaleString()}/year`);
  console.log('Fortnightly Income:', `$${fortnightlyIncome.toFixed(2)}`);
  console.groupEnd();

  // 3. Calculate INITIAL pension (before LTI discount)
  const pensionParams: PensionParams = {
    age: data.age || 67,
    relationshipStatus: mapRelationshipStatus(data.relationshipStatus),
    homeOwner: data.homeOwnership === 'yes',
    incomePerFortnight: fortnightlyIncome,
    totalAssets: initialTotalAssets
  };

  console.group('🏛️ Initial Pension Calculation (No LTI)');
  const initialPensionResult = calculatePension(pensionParams);
  console.log('Income Test:', `$${initialPensionResult.incomeTestPension.toFixed(2)}/year`);
  console.log('Asset Test:', `$${initialPensionResult.assetTestPension.toFixed(2)}/year`);
  console.log('Final Pension:', `$${initialPensionResult.finalPension.toFixed(2)}/year`);
  console.log('Eligibility:', initialPensionResult.eligibility);
  console.groupEnd();

  // 4. Get product recommendation
  const recommendedProduct = getProductRecommendation(initialPensionResult.pensionPercentage);
  console.log('🎯 Recommended Product:', recommendedProduct);

  // 5. Get allocation
  const allocation = getAllocationByProduct(recommendedProduct, superBalance);
  console.group('💼 Allocation');
  console.log('Choice:', `$${allocation.choiceAmount.toLocaleString()} (${allocation.choicePercent}%)`);
  console.log('Lifetime:', `$${allocation.lifetimeAmount.toLocaleString()} (${allocation.lifetimePercent}%)`);
  console.groupEnd();

  // 6. Calculate adjusted assets with LTI discount
  const assetReduction = allocation.lifetimeAmount * 0.4;
  const adjustedTotalAssets = initialTotalAssets - assetReduction;

  console.group('🎁 Lifetime Income Discount');
  console.log('Lifetime Amount:', `$${allocation.lifetimeAmount.toLocaleString()}`);
  console.log('40% Discount:', `$${assetReduction.toLocaleString()}`);
  console.log('Adjusted Total Assets:', `$${adjustedTotalAssets.toLocaleString()}`);
  console.groupEnd();

  // 7. Calculate ADJUSTED pension (after LTI discount)
  const adjustedPensionParams: PensionParams = {
    ...pensionParams,
    totalAssets: adjustedTotalAssets
  };

  console.group('🏛️ Adjusted Pension Calculation (With LTI)');
  const adjustedPensionResult = calculatePension(adjustedPensionParams);
  console.log('Income Test:', `$${adjustedPensionResult.incomeTestPension.toFixed(2)}/year`);
  console.log('Asset Test:', `$${adjustedPensionResult.assetTestPension.toFixed(2)}/year`);
  console.log('Final Pension:', `$${adjustedPensionResult.finalPension.toFixed(2)}/year`);
  console.groupEnd();

  // 8. Calculate pension increase
  const pensionIncrease = adjustedPensionResult.finalPension - initialPensionResult.finalPension;
  const pensionIncreasePercentage = initialPensionResult.finalPension > 0
    ? (pensionIncrease / initialPensionResult.finalPension) * 100
    : 0;

  console.group('📈 Pension Increase from LTI');
  console.log('Before LTI:', `$${initialPensionResult.finalPension.toFixed(2)}/year`);
  console.log('After LTI:', `$${adjustedPensionResult.finalPension.toFixed(2)}/year`);
  console.log('Increase:', `$${pensionIncrease.toFixed(2)}/year (${pensionIncreasePercentage.toFixed(1)}%)`);
  console.groupEnd();

  // 9. Calculate income streams
  const lifetimeIncomeAnnual = calculateLifetimeIncomeAnnual(allocation.lifetimeAmount, data.age || 67);
  const retirementYears = data.retirementYears ||
    (data.expectedLongevity || 85) - (data.age || 67);
  const choiceIncomeAnnual = calculateAnnualChoiceIncome(
    allocation.choiceAmount,
    data.age || 67,
    retirementYears
  );

  console.group('💵 Income Streams');
  console.log('Lifetime Income:', `$${lifetimeIncomeAnnual.toFixed(2)}/year`);
  console.log('Choice Income:', `$${choiceIncomeAnnual.toFixed(2)}/year`);
  console.groupEnd();

  // 10. Calculate totals
  const safetyNetAmount = lifetimeIncomeAnnual + adjustedPensionResult.finalPension;
  const totalRetirementIncome = choiceIncomeAnnual + lifetimeIncomeAnnual + adjustedPensionResult.finalPension;

  console.group('🎉 Final Totals');
  console.log('Safety Net (Lifetime + Pension):', `$${safetyNetAmount.toFixed(2)}/year`);
  console.log('Total Retirement Income:', `$${totalRetirementIncome.toFixed(2)}/year`);
  console.groupEnd();

  console.log('=====================================');
  console.groupEnd();

  return {
    // Asset calculations
    nonSuperAssets,
    initialTotalAssets,
    adjustedTotalAssets,
    assetReduction,

    // Income calculations
    totalAnnualIncome,
    fortnightlyIncome,

    // Initial pension
    initialPension: initialPensionResult.finalPension,
    initialIncomeTestPension: initialPensionResult.incomeTestPension,
    initialAssetTestPension: initialPensionResult.assetTestPension,

    // Adjusted pension
    adjustedPension: adjustedPensionResult.finalPension,
    adjustedIncomeTestPension: adjustedPensionResult.incomeTestPension,
    adjustedAssetTestPension: adjustedPensionResult.assetTestPension,
    pensionIncrease,
    pensionIncreasePercentage,

    // Product allocation
    recommendedProduct,
    allocation,

    // Income streams
    lifetimeIncomeAnnual,
    choiceIncomeAnnual,

    // Totals
    safetyNetAmount,
    totalRetirementIncome,

    // Eligibility
    eligibility: adjustedPensionResult.eligibility,
    pensionPercentage: adjustedPensionResult.pensionPercentage
  };
}