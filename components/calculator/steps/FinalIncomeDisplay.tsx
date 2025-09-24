"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ResponsiveBar } from "@nivo/bar";
import AnimatedCounter from "@/components/calculator/AnimatedCounter";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
  RETIREMENT_INCOME_VALUES,
  getASStackedColors,
} from "@/lib/retirementIncomeData";

// Generate chart data from hardcoded values
const RETIREMENT_INCOME_DATA = (() => {
  const data = [];
  const ages = Array.from({ length: 29 }, (_, i) => 67 + i); // 67 to 95

  ages.forEach((age) => {
    const pension = RETIREMENT_INCOME_VALUES.pension[age];
    const pensionUplift = RETIREMENT_INCOME_VALUES.pensionUplift[age];
    const lifetimeIncome = RETIREMENT_INCOME_VALUES.lifetimeIncome[age];

    // Use age-specific target if available, otherwise use default
    const targetTotal =
      RETIREMENT_INCOME_VALUES.targetTotalByAge?.[age] ||
      RETIREMENT_INCOME_VALUES.targetTotal;

    // Calculate choice income to hit target
    const choiceIncome = targetTotal - pension - pensionUplift - lifetimeIncome;

    data.push({
      age: age.toString(),
      pension: pension,
      pensionUplift: pensionUplift,
      lifetimeIncome: lifetimeIncome,
      choiceIncome: Math.max(0, choiceIncome), // Ensure non-negative
    });
  });

  return data;
})();

export default function FinalIncomeDisplay() {
  const { calculations, setCurrentStepValid } = useCalculatorStore();
  const [isAnimated, setIsAnimated] = useState(false);

  // Calculate total pension uplift across all years
  const totalPensionUplift = useMemo(() => {
    const ages = Array.from({ length: 29 }, (_, i) => 67 + i);
    return ages.reduce(
      (sum, age) => sum + RETIREMENT_INCOME_VALUES.pensionUplift[age],
      0
    );
  }, []);

  useEffect(() => {
    // Display page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  useEffect(() => {
    // Reduce animation delay for faster load
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Use chart data with animation
  const chartData = useMemo(() => {
    // If not animated yet, show 0 values
    if (!isAnimated) {
      return RETIREMENT_INCOME_DATA.map((item) => ({
        ...item,
        pension: 0,
        pensionUplift: 0,
        lifetimeIncome: 0,
        choiceIncome: 0,
      }));
    }
    return RETIREMENT_INCOME_DATA;
  }, [isAnimated]);

  const colors = getASStackedColors();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
      <motion.div
        className="text-center space-y-8 max-w-7xl w-full"
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
          Here's your total retirement income
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          With AustralianSuper Pre-Mix Option {calculations.recommendedPreMix}
        </motion.p>

        <motion.div
          className="py-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatedCounter
            value={RETIREMENT_INCOME_VALUES.targetTotal}
            delay={1000}
            formatAsCurrency={true}
            decimals={0}
            className="text-7xl md:text-8xl"
          />
          <p className="text-xl text-muted-foreground mt-4">every year</p>
        </motion.div>

        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-7xl mx-auto h-[600px] bg-card border-2 border-border rounded-3xl p-6 relative">
            {/* Chart Title */}
            <div className="absolute top-4 left-0 right-0 text-center z-10">
              <p className="text-lg font-semibold text-foreground">
                Your Income Breakdown
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
                keys={[
                  "pension",
                  "pensionUplift",
                  "lifetimeIncome",
                  "choiceIncome",
                ]}
                indexBy="age"
                groupMode="stacked"
                margin={{ top: 60, right: 190, bottom: 60, left: 90 }}
                padding={0.1}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={(bar) => colors[bar.id as keyof typeof colors]}
                borderRadius={2}
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
                  legend: "Annual Income ($)",
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
                tooltip={({ id, value, indexValue, data }) => (
                  <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-200">
                    <p className="font-semibold text-sm mb-2">
                      Age {indexValue}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs">Choice Income:</span>
                        <span className="text-sm font-bold">
                          ${data.choiceIncome?.toLocaleString("en-AU")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs">Lifetime Income:</span>
                        <span className="text-sm font-bold">
                          ${data.lifetimeIncome?.toLocaleString("en-AU")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs">Pension Uplift:</span>
                        <span className="text-sm font-bold">
                          ${data.pensionUplift?.toLocaleString("en-AU")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs">Age Pension:</span>
                        <span className="text-sm font-bold">
                          ${data.pension?.toLocaleString("en-AU")}
                        </span>
                      </div>
                      <div className="border-t pt-1 mt-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold">Total:</span>
                          <span className="text-sm font-bold text-orange-600">
                            $
                            {(
                              (data.choiceIncome || 0) +
                              (data.lifetimeIncome || 0) +
                              (data.pensionUplift || 0) +
                              (data.pension || 0)
                            ).toLocaleString("en-AU")}
                          </span>
                        </div>
                      </div>
                    </div>
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
                  text: {
                    fontSize: 16,
                    fontWeight: 400,
                    fontFamily: '"Inter", sans-serif',
                  },
                }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 12,
                    symbolShape: "square",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                    data: [
                      {
                        id: "choiceIncome",
                        label: "Choice Income",
                        color: colors.choiceIncome,
                      },
                      {
                        id: "lifetimeIncome",
                        label: "Lifetime Income",
                        color: colors.lifetimeIncome,
                      },
                      {
                        id: "pensionUplift",
                        label: "Pension Uplift",
                        color: colors.pensionUplift,
                      },
                      {
                        id: "pension",
                        label: "Age Pension",
                        color: colors.pension,
                      },
                    ],
                  },
                ]}
                enableGridY={true}
                gridYValues={[10000, 20000, 30000, 40000, 50000, 55000]}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary rounded-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xl font-bold text-foreground mb-2">
            🎉 That's ${totalPensionUplift.toLocaleString("en-AU")} in total
            pension uplift
          </p>
          <p className="text-lg text-muted-foreground">
            Thanks to AustralianSuper's lifetime income discount on the Age
            Pension means test over your retirement
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
