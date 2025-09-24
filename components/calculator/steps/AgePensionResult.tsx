"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ResponsiveBar } from "@nivo/bar";
import { useCalculatorStore } from "@/store/calculatorStore";
import { RETIREMENT_INCOME_VALUES } from "@/lib/retirementIncomeData";
// import { calculateRetirementIncome } from "@/lib/calculationService"; // Commented for demo performance

// Generate pension data from hardcoded values
const PENSION_DATA = (() => {
  const data = [];
  const ages = Array.from({ length: 29 }, (_, i) => 67 + i); // 67 to 95

  ages.forEach((age) => {
    data.push({
      age: age.toString(),
      pension: RETIREMENT_INCOME_VALUES.pension[age],
    });
  });

  return data;
})();

// Get AustralianSuper brand colors from CSS variables
const getASColors = () => {
  if (typeof window !== "undefined") {
    const styles = getComputedStyle(document.documentElement);
    return {
      primary: styles.getPropertyValue("--as-grenadier").trim() || "#D93E02", // Orange/Red
    };
  }
  return {
    primary: "#D93E02", // AS Grenadier
  };
};

export default function AgePensionResult() {
  const { setCalculations, calculations, personalInfo, setCurrentStepValid } =
    useCalculatorStore();

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Reduce animation delay for faster load
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Result page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  // FOR DEMO PURPOSES - Use hardcoded values instead of calculations
  useEffect(() => {
    if (!calculations.pensionEligibility) {
      // Set default demo values immediately
      setCalculations({
        estimatedPension: 15000,
        initialAssets: 500000,
        adjustedAssets: 480000,
        adjustedPensionAmount: 18000,
        incomeIncreaseWithAS: 3000,
        lifetimeIncome: 10000,
        choiceIncome: 22000,
        totalRetirementIncome: 50000,
        safetyNetAmount: 28000,
        pensionEligibility: "partial",
        recommendedPreMix: "C",
      });
    }
  }, [calculations.pensionEligibility, setCalculations]);

  // COMMENTED OUT FOR DEMO - Heavy calculations
  // useEffect(() => {
  //   console.group("🧮 AgePensionResult - Running Centralized Calculations");
  //   const calculatorData = { ... };
  //   const results = calculateRetirementIncome(calculatorData);
  //   setCalculations({ ... });
  //   console.groupEnd();
  // }, [personalInfo, assets, pensionData, setCalculations]);

  // Use pre-generated chart data with animation
  const chartData = useMemo(() => {
    // If not animated yet, show 0 values
    if (!isAnimated) {
      return PENSION_DATA.map((item) => ({
        ...item,
        pension: 0,
      }));
    }
    return PENSION_DATA;
  }, [isAnimated]);

  const colors = getASColors();

  const eligibilityText = {
    "not-eligible": "You're not currently eligible",
    partial: "You qualify for a partial Age Pension",
    full: "You qualify for the full Age Pension",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-8 max-w-7xl w-full flex flex-col items-center"
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

        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-5xl mx-auto h-[600px] bg-card border-2 border-border rounded-3xl p-6 relative">
            {/* Chart Title */}
            <div className="absolute top-4 left-0 right-0 text-center z-10">
              <p className="text-lg font-semibold text-foreground">
                Your Age Pension Projection Over Time
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <ResponsiveBar
                data={chartData}
                keys={["pension"]}
                indexBy="age"
                margin={{ top: 50, right: 30, bottom: 60, left: 80 }}
                padding={0.2}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={[colors.primary]}
                borderRadius={4}
                borderWidth={0}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Age",
                  legendPosition: "middle",
                  legendOffset: 40,
                  tickValues: ["67", "70", "75", "80", "85", "90", "95"],
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Annual Pension ($)",
                  legendPosition: "middle",
                  legendOffset: -60,
                  format: (value) => `$${(value / 1000).toFixed(0)}k`,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                enableLabel={false}
                animate={true}
                motionConfig={{
                  mass: 1,
                  tension: 170,
                  friction: 26,
                  clamp: false,
                  precision: 0.01,
                  velocity: 0,
                }}
                tooltip={({ indexValue, value }) => (
                  <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-200">
                    <p className="font-semibold text-sm">Age {indexValue}</p>
                    <p className="text-lg font-bold text-orange-600">
                      ${value?.toLocaleString("en-AU")} per year
                    </p>
                  </div>
                )}
                theme={{
                  axis: {
                    legend: {
                      text: {
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: '"Inter", sans-serif',
                      },
                    },
                    ticks: {
                      text: {
                        fontSize: 12,
                        fontFamily: '"Inter", sans-serif',
                      },
                    },
                  },
                  grid: {
                    line: {
                      stroke: "#e5e5e5",
                      strokeWidth: 1,
                    },
                  },
                }}
                enableGridY={true}
                gridYValues={[5000, 10000, 15000, 20000, 25000, 30000]}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="p-6 bg-primary/10 border-2 border-primary rounded-2xl w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-foreground">
            💡 With AustralianSuper's lifetime income product, you could
            increase this further
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
