// Hardcoded retirement income values for ages 67 to 95
// All values are in AUD per year

interface RetirementIncomeValues {
  targetTotal: number;
  targetTotalByAge?: Record<number, number>;
  pension: Record<number, number>;
  pensionUplift: Record<number, number>;
  lifetimeIncome: Record<number, number>;
}

export const RETIREMENT_INCOME_VALUES: RetirementIncomeValues = {
  targetTotal: 52380, // Default target total retirement income

  // Age-specific target totals (optional - for custom targets at specific ages)
  targetTotalByAge: {
    95: 33350  // At 95: pension (27770) + uplift (0) + lifetime (5580) = 33350, so choice income = 0
  },

  // Age Pension values (gradual growth to 22k by age 80, then plateaus to 27,770)
  pension: {
    67: 5975,
    68: 7500,
    69: 9000,
    70: 10500,
    71: 12000,
    72: 13500,
    73: 15000,
    74: 16500,
    75: 17800,
    76: 18900,
    77: 19900,
    78: 20800,
    79: 21500,
    80: 22000,  // Target reached
    81: 22800,
    82: 23500,
    83: 24100,
    84: 24600,
    85: 25000,
    86: 25350,
    87: 25650,
    88: 25900,
    89: 26200,
    90: 26450,
    91: 26650,
    92: 26850,
    93: 27100,
    94: 27450,
    95: 27770
  },

  // Pension uplift - flat 5616, decreases only when total would exceed 27,770
  pensionUplift: {
    67: 5616,  // 5975 + 5616 = 11591
    68: 5616,  // 7500 + 5616 = 13116
    69: 5616,  // 9000 + 5616 = 14616
    70: 5616,  // 10500 + 5616 = 16116
    71: 5616,  // 12000 + 5616 = 17616
    72: 5616,  // 13500 + 5616 = 19116
    73: 5616,  // 15000 + 5616 = 20616
    74: 5616,  // 16500 + 5616 = 22116
    75: 5616,  // 17800 + 5616 = 23416
    76: 5616,  // 18900 + 5616 = 24516
    77: 5616,  // 19900 + 5616 = 25516
    78: 5616,  // 20800 + 5616 = 26416
    79: 5616,  // 21500 + 5616 = 27116
    80: 5616,  // 22000 + 5616 = 27616
    81: 4970,  // 22800 + 4970 = 27770 (cap reached)
    82: 4270,  // 23500 + 4270 = 27770
    83: 3670,  // 24100 + 3670 = 27770
    84: 3170,  // 24600 + 3170 = 27770
    85: 2770,  // 25000 + 2770 = 27770
    86: 2420,  // 25350 + 2420 = 27770
    87: 2120,  // 25650 + 2120 = 27770
    88: 1870,  // 25900 + 1870 = 27770
    89: 1570,  // 26200 + 1570 = 27770
    90: 1320,  // 26450 + 1320 = 27770
    91: 1120,  // 26650 + 1120 = 27770
    92: 920,   // 26850 + 920 = 27770
    93: 670,   // 27100 + 670 = 27770
    94: 320,   // 27450 + 320 = 27770
    95: 0      // 27770 + 0 = 27770 (pension at max)
  },

  // Lifetime income (fluctuates around 11000 with ±500 variation)
  lifetimeIncome: {
    67: 11000,
    68: 11250,
    69: 10820,
    70: 11380,
    71: 10740,
    72: 11150,
    73: 10880,
    74: 11320,
    75: 10950,
    76: 11190,
    77: 10850,
    78: 11280,
    79: 10780,
    80: 11140,
    81: 10910,
    82: 11350,
    83: 10870,
    84: 11220,
    85: 10790,
    86: 11160,
    87: 10930,
    88: 11300,
    89: 10840,
    90: 11180,
    91: 10890,
    92: 11260,
    93: 10810,
    94: 11130,
    95: 10980
  }
};

// Get AustralianSuper brand colors
export const getASStackedColors = () => {
  if (typeof window !== 'undefined') {
    const styles = getComputedStyle(document.documentElement);
    return {
      pension: styles.getPropertyValue('--as-chamois').trim() || "#EDE1B5",      // Beige
      pensionUplift: "#F5A623",                                                   // Light orange
      lifetimeIncome: styles.getPropertyValue('--as-grenadier').trim() || "#D93E02", // Orange/Red
      choiceIncome: styles.getPropertyValue('--as-tolopea').trim() || "#260046"     // Purple
    };
  }
  // Fallback colors for SSR
  return {
    pension: "#EDE1B5",        // AS Chamois (beige)
    pensionUplift: "#F5A623",  // Light orange
    lifetimeIncome: "#D93E02", // AS Grenadier (orange/red)
    choiceIncome: "#260046"    // AS Tolopea (purple)
  };
};