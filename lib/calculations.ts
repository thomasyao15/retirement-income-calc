/**
 * Parameters required for pension calculation
 */
export interface PensionParams {
  /** Person's current age */
  age: number;
  /** Relationship status - determines pension rates and thresholds */
  relationshipStatus: "single" | "couple";
  /** Whether person owns their home - affects asset test thresholds */
  homeOwner: boolean;
  /** Combined fortnightly income (employment, rental, dividends, etc.) */
  incomePerFortnight: number;
  /** Total assessable assets including super, bank accounts, investments, etc. */
  totalAssets: number;
}

/**
 * Result of pension calculation
 */
export interface PensionResult {
  /** Annual pension amount based on income test alone */
  incomeTestPension: number;
  /** Annual pension amount based on asset test alone */
  assetTestPension: number;
  /** Final annual pension (minimum of income and asset tests) */
  finalPension: number;
  /** Percentage of full pension eligible for (0-100) */
  pensionPercentage: number;
  /** Eligibility category */
  eligibility: "not-eligible" | "partial" | "full";
}

/**
 * Allocation of super between Choice Income and Lifetime Income products
 */
export interface AllocationResult {
  /** Percentage allocated to Choice Income */
  choicePercent: number;
  /** Percentage allocated to Lifetime Income */
  lifetimePercent: number;
  /** Dollar amount allocated to Choice Income */
  choiceAmount: number;
  /** Dollar amount allocated to Lifetime Income */
  lifetimeAmount: number;
}

// Constants (as per Australian government rates)
const PENSION_RATES = {
  single: 1051.3, // Per fortnight
  couple: 1585.0, // Per fortnight (combined)
};

const INCOME_FREE_AREA = {
  single: 218, // Per fortnight
  couple: 380, // Per fortnight
};

const ASSET_THRESHOLDS = {
  single: { homeOwner: 321500, nonHomeOwner: 579500 },
  couple: { homeOwner: 481500, nonHomeOwner: 739500 },
};

const ASSET_CUTOFF = {
  single: { homeOwner: 704500, nonHomeOwner: 962500 },
  couple: { homeOwner: 1059000, nonHomeOwner: 1317000 },
};

export function annualToFortnightly(annual: number): number {
  return annual / 26;
}

export function fortnightlyToAnnual(fortnight: number): number {
  return fortnight * 26;
}

/**
 * Gets the age-based annual reduction rate for Choice Income products.
 * Higher ages have higher reduction rates as life expectancy decreases.
 *
 * @param age - Current age of the person
 * @returns Annual reduction rate as a decimal (0.05 = 5%)
 * @example
 * getAgeBasedCutRate(67) // returns 0.05 (5% per year)
 * getAgeBasedCutRate(85) // returns 0.09 (9% per year)
 */
export function getAgeBasedCutRate(age: number): number {
  if (age >= 95) return 0.14; // 14% annual reduction
  if (age >= 90) return 0.11; // 11% annual reduction
  if (age >= 85) return 0.09; // 9% annual reduction
  if (age >= 80) return 0.07; // 7% annual reduction
  if (age >= 75) return 0.06; // 6% annual reduction
  if (age >= 65) return 0.05; // 5% annual reduction
  if (age >= 60) return 0.04; // 4% annual reduction
  return 0.0; // No reduction under 60
}

/**
 * Calculates the Age Pension amount based on the income test.
 *
 * How it works:
 * 1. Income below the free area doesn't affect pension
 * 2. Income above free area reduces pension by 50 cents per dollar
 * 3. Returns the annual pension amount after income test
 *
 * @param incomePerFortnight - Combined fortnightly income
 * @param relationshipStatus - Single or couple status
 * @returns Annual pension amount based on income test
 * @example
 * // Single person with $300/fortnight income
 * // Free area is $218, excess is $82
 * // Reduction is $82 * 0.5 = $41
 * // Pension is $1051.30 - $41 = $1010.30/fortnight = $26,267.80/year
 * calculateIncomeTest(300, 'single') // returns 26267.80
 */
export function calculateIncomeTest(
  incomePerFortnight: number,
  relationshipStatus: "single" | "couple"
): number {
  const fullPension = PENSION_RATES[relationshipStatus];
  const freeArea = INCOME_FREE_AREA[relationshipStatus];

  // Calculate reduction: 50 cents for every dollar over free area
  const reduction =
    incomePerFortnight > freeArea ? (incomePerFortnight - freeArea) * 0.5 : 0;

  const fortnightlyPension = Math.max(fullPension - reduction, 0);
  return fortnightlyToAnnual(fortnightlyPension);
}

/**
 * Calculates the Age Pension amount based on the asset test.
 *
 * How it works:
 * 1. Assets below lower threshold = full pension
 * 2. Assets above upper threshold = no pension
 * 3. Assets between thresholds = reduced by $3 per fortnight for every $1,000 over lower threshold
 *
 * Thresholds vary based on:
 * - Relationship status (single vs couple)
 * - Home ownership (homeowners have lower thresholds)
 *
 * @param totalAssets - Total assessable assets including super
 * @param relationshipStatus - Single or couple status
 * @param homeOwner - Whether person owns their home
 * @returns Annual pension amount based on asset test
 * @example
 * // Single homeowner with $400,000 assets
 * // Lower threshold is $321,500, excess is $78,500
 * // Reduction is ($78,500 / $1,000) * $3 = $235.50/fortnight
 * // Pension is $1051.30 - $235.50 = $815.80/fortnight = $21,210.80/year
 * calculateAssetTest(400000, 'single', true) // returns 21210.80
 */
export function calculateAssetTest(
  totalAssets: number,
  relationshipStatus: "single" | "couple",
  homeOwner: boolean
): number {
  const fullPension = PENSION_RATES[relationshipStatus];
  const lowerThreshold =
    ASSET_THRESHOLDS[relationshipStatus][
      homeOwner ? "homeOwner" : "nonHomeOwner"
    ];
  const upperThreshold =
    ASSET_CUTOFF[relationshipStatus][homeOwner ? "homeOwner" : "nonHomeOwner"];

  let fortnightlyPension = 0;

  if (totalAssets <= lowerThreshold) {
    // Below lower threshold = full pension
    fortnightlyPension = fullPension;
  } else if (totalAssets >= upperThreshold) {
    // Above upper threshold = no pension
    fortnightlyPension = 0;
  } else {
    // Between thresholds = reduced pension
    const excess = totalAssets - lowerThreshold;
    const reduction = (excess / 1000) * 3; // $3 per $1,000 over threshold
    fortnightlyPension = Math.max(fullPension - reduction, 0);
  }

  return fortnightlyToAnnual(fortnightlyPension);
}

/**
 * Calculates the Age Pension amount using both income and asset tests.
 *
 * The Australian Age Pension uses two tests:
 * 1. Income Test - reduces pension based on income
 * 2. Asset Test - reduces pension based on assets
 *
 * The LOWER of the two results is the actual pension amount (worst case).
 *
 * @param params - All parameters needed for calculation
 * @returns Detailed pension calculation results
 * @example
 * calculatePension({
 *   age: 67,
 *   relationshipStatus: 'single',
 *   homeOwner: true,
 *   incomePerFortnight: 300,
 *   totalAssets: 400000
 * })
 * // Returns: {
 * //   incomeTestPension: 26267.80,
 * //   assetTestPension: 21210.80,
 * //   finalPension: 21210.80,  // Lower of the two
 * //   pensionPercentage: 78.5,
 * //   eligibility: 'partial'
 * // }
 */
export function calculatePension(params: PensionParams): PensionResult {
  console.group("📊 calculatePension()");
  console.table(params);

  // Calculate pension under income test
  const incomeTestPension = calculateIncomeTest(
    params.incomePerFortnight,
    params.relationshipStatus
  );
  console.log("Income Test Result:", `$${incomeTestPension.toFixed(2)}/year`);

  // Calculate pension under asset test
  const assetTestPension = calculateAssetTest(
    params.totalAssets,
    params.relationshipStatus,
    params.homeOwner
  );
  console.log("Asset Test Result:", `$${assetTestPension.toFixed(2)}/year`);

  // Final pension is the LOWER of the two tests
  const finalPension = Math.min(incomeTestPension, assetTestPension);
  console.log(
    "Final Pension (lower of two):",
    `$${finalPension.toFixed(2)}/year`
  );

  // Calculate percentage of full pension
  const fullPension = fortnightlyToAnnual(
    PENSION_RATES[params.relationshipStatus]
  );
  const pensionPercentage = (finalPension / fullPension) * 100;

  // Determine eligibility category
  let eligibility: "not-eligible" | "partial" | "full";
  if (pensionPercentage === 0) {
    eligibility = "not-eligible";
  } else if (pensionPercentage >= 100) {
    eligibility = "full";
  } else {
    eligibility = "partial";
  }

  console.log("Pension Percentage:", `${pensionPercentage.toFixed(1)}%`);
  console.log("Eligibility:", eligibility);
  console.groupEnd();

  return {
    incomeTestPension,
    assetTestPension,
    finalPension,
    pensionPercentage: Math.min(100, Math.max(0, pensionPercentage)),
    eligibility,
  };
}

/**
 * Determines the recommended PreSet product based on Age Pension eligibility.
 *
 * Product recommendations:
 * - Product A: 90-100% of full pension (high pension, low super needed)
 * - Product B: 50-90% of full pension (moderate pension)
 * - Product C: 10-50% of full pension (low pension, benefits from LTI discount)
 * - Product D: 0-10% of full pension (minimal/no pension, focus on super)
 *
 * Product C is optimal for those with partial pensions as the Lifetime Income
 * discount can significantly increase their Age Pension.
 *
 * @param pensionPercentage - Percentage of full pension eligible for (0-100)
 * @returns Recommended product code ('A', 'B', 'C', or 'D')
 * @example
 * getProductRecommendation(25) // returns 'C' (optimal for 10-50% range)
 * getProductRecommendation(95) // returns 'A' (high pension already)
 */
export function getProductRecommendation(
  pensionPercentage: number
): "A" | "B" | "C" | "D" {
  if (pensionPercentage >= 0 && pensionPercentage < 10) {
    return "D"; // Minimal pension - focus on super income
  } else if (pensionPercentage >= 10 && pensionPercentage < 50) {
    return "C"; // Low pension - benefit from LTI discount
  } else if (pensionPercentage >= 50 && pensionPercentage < 90) {
    return "B"; // Moderate pension
  } else {
    return "A"; // High/full pension already
  }
}

/**
 * Gets the allocation split between Choice Income and Lifetime Income products.
 *
 * Product allocations:
 * - Product A: 100% Choice, 0% Lifetime (already have high pension)
 * - Product B: 100% Choice, 0% Lifetime (moderate pension, flexibility preferred)
 * - Product C: 70% Choice, 30% Lifetime (optimize with LTI discount)
 * - Product D: 100% Choice, 0% Lifetime (no pension to optimize)
 *
 * Product C uses 30% Lifetime Income to get the 40% asset discount,
 * which can significantly increase Age Pension for those in the partial range.
 *
 * @param product - Product code ('A', 'B', 'C', or 'D')
 * @param superBalance - Total super balance to allocate
 * @returns Allocation percentages and dollar amounts
 * @example
 * getAllocationByProduct('C', 500000)
 * // Returns: {
 * //   choicePercent: 70,
 * //   lifetimePercent: 30,
 * //   choiceAmount: 350000,
 * //   lifetimeAmount: 150000
 * // }
 */
export function getAllocationByProduct(
  product: "A" | "B" | "C" | "D",
  superBalance: number
): AllocationResult {
  const allocations = {
    A: { choice: 85, lifetime: 15 }, // High pension already, small LTI for bonus
    B: { choice: 80, lifetime: 20 }, // Moderate pension, some LTI benefit
    C: { choice: 70, lifetime: 30 }, // Optimal LTI discount zone
    D: { choice: 90, lifetime: 10 }, // Minimal pension, focus on super with small LTI
  };

  const allocation = allocations[product];

  console.group("📦 getAllocationByProduct()");
  console.log("Product:", product);
  console.log("Super Balance:", `$${superBalance.toLocaleString()}`);
  console.log(
    "Allocation Split:",
    `${allocation.choice}% Choice / ${allocation.lifetime}% Lifetime`
  );
  console.log(
    "Choice Amount:",
    `$${((superBalance * allocation.choice) / 100).toLocaleString()}`
  );
  console.log(
    "Lifetime Amount:",
    `$${((superBalance * allocation.lifetime) / 100).toLocaleString()}`
  );
  console.groupEnd();

  return {
    choicePercent: allocation.choice,
    lifetimePercent: allocation.lifetime,
    choiceAmount: superBalance * (allocation.choice / 100),
    lifetimeAmount: superBalance * (allocation.lifetime / 100),
  };
}

/**
 * Calculates the reduced assessable assets after Lifetime Income discount.
 *
 * How the discount works:
 * - When you purchase a Lifetime Income product, 40% of the purchase amount
 *   is excluded from the Age Pension assets test
 * - This reduces your assessable assets, potentially increasing your pension
 *
 * @param totalAssets - Total assessable assets before discount
 * @param lifetimeAmount - Amount invested in Lifetime Income product
 * @returns New assessable assets after 40% discount
 * @example
 * // $500,000 total assets, $150,000 in Lifetime Income
 * // Discount is $150,000 * 0.4 = $60,000
 * // New assessable assets = $500,000 - $60,000 = $440,000
 * calculateLifetimeIncomeDiscount(500000, 150000) // returns 440000
 */
export function calculateLifetimeIncomeDiscount(
  totalAssets: number,
  lifetimeAmount: number
): number {
  // 40% of lifetime income amount is discounted from assessable assets
  const discount = 0.4 * lifetimeAmount;
  return totalAssets - discount;
}

/**
 * Recalculates Age Pension after applying Lifetime Income discount.
 *
 * This is the key benefit of Product C:
 * 1. Original assets are reduced by 40% of Lifetime Income amount
 * 2. Lower assessable assets may result in higher Age Pension
 * 3. The increase can be substantial for those in the partial pension range
 *
 * @param params - Original pension calculation parameters
 * @param lifetimeAmount - Amount invested in Lifetime Income product
 * @returns New pension calculation with discounted assets
 * @example
 * // Original: $500,000 assets, partial pension of $15,000/year
 * // With $150,000 in LTI: assets reduced to $440,000
 * // New pension might be $20,000/year (33% increase)
 * calculateAdjustedPension(originalParams, 150000)
 */
export function calculateAdjustedPension(
  params: PensionParams,
  lifetimeAmount: number
): PensionResult {
  console.group("🔄 calculateAdjustedPension()");
  console.log(
    "Original Total Assets:",
    `$${params.totalAssets.toLocaleString()}`
  );
  console.log("Lifetime Income Amount:", `$${lifetimeAmount.toLocaleString()}`);
  console.log("40% Discount:", `$${(lifetimeAmount * 0.4).toLocaleString()}`);

  // Apply the 40% discount to assessable assets
  const discountedAssets = calculateLifetimeIncomeDiscount(
    params.totalAssets,
    lifetimeAmount
  );
  console.log("Discounted Assets:", `$${discountedAssets.toLocaleString()}`);
  console.groupEnd();

  // Recalculate pension with lower assessable assets
  return calculatePension({
    ...params,
    totalAssets: discountedAssets,
  });
}

/**
 * Calculates average annual income from Choice Income product.
 *
 * Choice Income uses age-based reduction rates where each year a percentage
 * of the remaining balance is withdrawn. The percentage increases with age
 * to reflect shorter life expectancy.
 *
 * This calculation:
 * 1. Projects withdrawals year by year using age-based rates
 * 2. Returns the average annual withdrawal over retirement years
 *
 * Note: For simplicity, this returns an average. Actual payments would
 * vary each year based on the remaining balance.
 *
 * @param choiceAmount - Total amount in Choice Income product
 * @param currentAge - Current age of the person
 * @param retirementYears - Expected years in retirement
 * @returns Average annual income from Choice Income
 * @example
 * // $350,000 at age 67 for 20 years
 * // Uses 5% at 67, 5% at 68, etc., increasing with age
 * calculateAnnualChoiceIncome(350000, 67, 20) // returns ~22000/year average
 */
export function calculateAnnualChoiceIncome(
  choiceAmount: number,
  currentAge: number,
  retirementYears: number
): number {
  if (retirementYears <= 0 || choiceAmount <= 0) return 0;

  let remainingBalance = choiceAmount;
  let totalWithdrawn = 0;

  // Calculate total withdrawals over retirement years
  for (let year = 0; year < retirementYears; year++) {
    const age = currentAge + year;
    const rate = getAgeBasedCutRate(age);
    const withdrawal = remainingBalance * rate;

    totalWithdrawn += withdrawal;
    remainingBalance = Math.max(0, remainingBalance - withdrawal);

    // Stop if balance depleted
    if (remainingBalance <= 0) break;
  }

  // Return average annual withdrawal
  return totalWithdrawn / retirementYears;
}

/**
 * Calculates annual income from Lifetime Income product.
 *
 * Lifetime Income provides guaranteed payments for life at a fixed rate
 * of 6.7% per year ($6,700 per $100,000 invested).
 *
 * This rate is guaranteed regardless of:
 * - How long you live
 * - Market conditions
 * - Interest rate changes
 *
 * @param lifetimeAmount - Amount invested in Lifetime Income product
 * @param age - Current age (not used in calculation, kept for compatibility)
 * @returns Annual income from Lifetime Income
 * @example
 * // $100,000 investment = $6,700/year for life
 * calculateLifetimeIncomeAnnual(100000, 67) // returns 6700
 * // $150,000 investment = $10,050/year for life
 * calculateLifetimeIncomeAnnual(150000, 67) // returns 10050
 * // $1,000,000 investment = $67,000/year for life
 * calculateLifetimeIncomeAnnual(1000000, 67) // returns 67000
 */
export function calculateLifetimeIncomeAnnual(
  lifetimeAmount: number,
  _age: number // Kept for interface compatibility, not used in calculation
): number {
  // Fixed rate: $6,700 per year for every $100,000 invested
  const LIFETIME_INCOME_RATE = 0.067;
  const result = lifetimeAmount * LIFETIME_INCOME_RATE;

  console.group("💵 calculateLifetimeIncomeAnnual()");
  console.log("Lifetime Amount:", `$${lifetimeAmount.toLocaleString()}`);
  console.log(
    "Rate:",
    `${(LIFETIME_INCOME_RATE * 100).toFixed(1)}% (${LIFETIME_INCOME_RATE})`
  );
  console.log("Annual Income:", `$${result.toFixed(2)}`);
  console.groupEnd();

  return result;
}

/**
 * Maps relationship status from UI options to calculation format.
 *
 * The Age Pension has different rates and thresholds for:
 * - Singles: living alone or not in a relationship
 * - Couples: married or de facto relationships (combined assessment)
 *
 * @param status - Relationship status from UI ('married', 'defacto', 'single', etc.)
 * @returns Simplified status for calculations ('single' or 'couple')
 * @example
 * mapRelationshipStatus('married') // returns 'couple'
 * mapRelationshipStatus('defacto') // returns 'couple'
 * mapRelationshipStatus('single')  // returns 'single'
 * mapRelationshipStatus('divorced') // returns 'single'
 */
export function mapRelationshipStatus(status?: string): "single" | "couple" {
  if (status === "married" || status === "defacto") {
    return "couple";
  }
  return "single";
}
