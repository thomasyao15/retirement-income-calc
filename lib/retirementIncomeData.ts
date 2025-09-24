// Hardcoded retirement income values for ages 67 to 95
// All values are in AUD per year

interface RetirementIncomeValues {
  targetTotal: number;
  pension: Record<number, number>;
  pensionUplift: Record<number, number>;
  lifetimeIncome: Record<number, number>;
}

export const RETIREMENT_INCOME_VALUES: RetirementIncomeValues = {
  targetTotal: 55000, // Target total retirement income

  // Age Pension values (rapid growth to 22k by age 75, then plateaus to 27,770)
  pension: {
    67: 5975,
    68: 8500,
    69: 11000,
    70: 13500,
    71: 16000,
    72: 18000,
    73: 19800,
    74: 21000,
    75: 22000,  // Target reached
    76: 22800,
    77: 23500,
    78: 24100,
    79: 24600,
    80: 25000,
    81: 25350,
    82: 25650,
    83: 25900,
    84: 26100,
    85: 26350,
    86: 26550,
    87: 26750,
    88: 26950,
    89: 27100,
    90: 27250,
    91: 27400,
    92: 27500,
    93: 27600,
    94: 27680,
    95: 27770
  },

  // Pension uplift - flat 5616, decreases only when total would exceed 27,770
  pensionUplift: {
    67: 5616,  // 5975 + 5616 = 11591
    68: 5616,  // 8500 + 5616 = 14116
    69: 5616,  // 11000 + 5616 = 16616
    70: 5616,  // 13500 + 5616 = 19116
    71: 5616,  // 16000 + 5616 = 21616
    72: 5616,  // 18000 + 5616 = 23616
    73: 5616,  // 19800 + 5616 = 25416
    74: 5616,  // 21000 + 5616 = 26616
    75: 5616,  // 22000 + 5616 = 27616
    76: 4970,  // 22800 + 4970 = 27770 (cap reached)
    77: 4270,  // 23500 + 4270 = 27770
    78: 3670,  // 24100 + 3670 = 27770
    79: 3170,  // 24600 + 3170 = 27770
    80: 2770,  // 25000 + 2770 = 27770
    81: 2420,  // 25350 + 2420 = 27770
    82: 2120,  // 25650 + 2120 = 27770
    83: 1870,  // 25900 + 1870 = 27770
    84: 1670,  // 26100 + 1670 = 27770
    85: 1420,  // 26350 + 1420 = 27770
    86: 1220,  // 26550 + 1220 = 27770
    87: 1020,  // 26750 + 1020 = 27770
    88: 820,   // 26950 + 820 = 27770
    89: 670,   // 27100 + 670 = 27770
    90: 520,   // 27250 + 520 = 27770
    91: 370,   // 27400 + 370 = 27770
    92: 270,   // 27500 + 270 = 27770
    93: 170,   // 27600 + 170 = 27770
    94: 90,    // 27680 + 90 = 27770
    95: 0      // 27770 + 0 = 27770 (pension at max)
  },

  // Lifetime income (fluctuates around 5616 with ±500 variation)
  lifetimeIncome: {
    67: 5616,
    68: 5750,
    69: 5420,
    70: 5880,
    71: 5340,
    72: 5700,
    73: 5480,
    74: 5820,
    75: 5550,
    76: 5690,
    77: 5450,
    78: 5780,
    79: 5380,
    80: 5640,
    81: 5510,
    82: 5850,
    83: 5470,
    84: 5720,
    85: 5390,
    86: 5660,
    87: 5530,
    88: 5800,
    89: 5440,
    90: 5680,
    91: 5490,
    92: 5760,
    93: 5410,
    94: 5630,
    95: 5580
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