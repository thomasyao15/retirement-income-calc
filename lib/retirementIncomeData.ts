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

  // Age Pension values (gradually decreasing due to assets drawdown)
  pension: {
    67: 18000,
    68: 18200,
    69: 18300,
    70: 18400,
    71: 18350,
    72: 18300,
    73: 18200,
    74: 18100,
    75: 18000,
    76: 17900,
    77: 17800,
    78: 17650,
    79: 17500,
    80: 17300,
    81: 17100,
    82: 16900,
    83: 16700,
    84: 16500,
    85: 16200,
    86: 16000,
    87: 15800,
    88: 15600,
    89: 15400,
    90: 15200,
    91: 15100,
    92: 15000,
    93: 15000,
    94: 15000,
    95: 15000
  },

  // Pension uplift from AustralianSuper lifetime income discount (gradually increasing)
  pensionUplift: {
    67: 3000,
    68: 3100,
    69: 3200,
    70: 3300,
    71: 3400,
    72: 3500,
    73: 3600,
    74: 3700,
    75: 3800,
    76: 3900,
    77: 4000,
    78: 4100,
    79: 4200,
    80: 4300,
    81: 4350,
    82: 4400,
    83: 4450,
    84: 4500,
    85: 4500,
    86: 4500,
    87: 4500,
    88: 4500,
    89: 4500,
    90: 4500,
    91: 4500,
    92: 4500,
    93: 4500,
    94: 4500,
    95: 4500
  },

  // Lifetime income (constant guaranteed income for life)
  lifetimeIncome: {
    67: 10000,
    68: 10000,
    69: 10000,
    70: 10000,
    71: 10000,
    72: 10000,
    73: 10000,
    74: 10000,
    75: 10000,
    76: 10000,
    77: 10000,
    78: 10000,
    79: 10000,
    80: 10000,
    81: 10000,
    82: 10000,
    83: 10000,
    84: 10000,
    85: 10000,
    86: 10000,
    87: 10000,
    88: 10000,
    89: 10000,
    90: 10000,
    91: 10000,
    92: 10000,
    93: 10000,
    94: 10000,
    95: 10000
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