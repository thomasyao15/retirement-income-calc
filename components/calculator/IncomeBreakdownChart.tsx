"use client";

import { useMemo, useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";

interface IncomeBreakdownChartProps {
  lifetimeIncome: number;
  choiceIncome: number;
  agePension: number;
  className?: string;
}

// Get AustralianSuper brand colors from CSS variables
const getASColors = () => {
  if (typeof window !== 'undefined') {
    const styles = getComputedStyle(document.documentElement);
    return {
      lifetime: styles.getPropertyValue('--as-grenadier').trim() || "#D93E02",  // Red/Orange
      choice: styles.getPropertyValue('--as-tolopea').trim() || "#260046",      // Purple
      pension: styles.getPropertyValue('--as-chamois').trim() || "#EDE1B5",     // Beige/Cream
    };
  }
  // Fallback colors for SSR
  return {
    lifetime: "#D93E02", // AS Grenadier
    choice: "#260046",   // AS Tolopea
    pension: "#EDE1B5",  // AS Chamois
  };
};

export default function IncomeBreakdownChart({
  lifetimeIncome = 0,
  choiceIncome = 0,
  agePension = 0,
  className = "",
}: IncomeBreakdownChartProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Delay the animation to trigger Nivo's animation system
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const data = useMemo(() => {
    // Get colors from CSS variables
    const colors = getASColors();

    // Round all values to nearest dollar
    const roundedLifetime = Math.round(lifetimeIncome);
    const roundedChoice = Math.round(choiceIncome);
    const roundedPension = Math.round(agePension);

    // Start with 0 values if not animated yet (except Age Pension stays full)
    const actualLifetime = isAnimated ? roundedLifetime : 0;
    const actualChoice = isAnimated ? roundedChoice : 0;
    const actualPension = roundedPension; // Age Pension always at full value

    return [
      {
        id: "Lifetime Income",
        label: "Lifetime Income",
        value: Math.max(1, actualLifetime), // Use 1 minimum to avoid empty chart
        color: colors.lifetime,
        formattedValue: `$${roundedLifetime.toLocaleString("en-AU")}`,
      },
      {
        id: "Choice Income",
        label: "Choice Income",
        value: Math.max(1, actualChoice),
        color: colors.choice,
        formattedValue: `$${roundedChoice.toLocaleString("en-AU")}`,
      },
      {
        id: "Age Pension",
        label: "Age Pension",
        value: Math.max(1, actualPension),
        color: colors.pension,
        formattedValue: `$${roundedPension.toLocaleString("en-AU")}`,
      },
    ];
  }, [lifetimeIncome, choiceIncome, agePension, isAnimated]);

  const total = Math.round(lifetimeIncome) + Math.round(choiceIncome) + Math.round(agePension);

  return (
    <div className={`w-full h-[500px] ${className}`}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 120, bottom: 80, left: 120 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        colors={{ datum: "data.color" }}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLinkLabelsDiagonalLength={20}
        arcLinkLabelsStraightLength={30}
        arcLinkLabelsTextOffset={8}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="white"
        arcLabel={(d) => {
          const percentage = ((d.value / total) * 100).toFixed(0);
          return `${percentage}%`;
        }}
        valueFormat={(value) => `$${value.toLocaleString("en-AU")}`}
        tooltip={({ datum }) => (
          <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: datum.color }}
              />
              <div>
                <p className="font-semibold text-sm">{datum.label}</p>
                <p className="text-lg font-bold">{datum.data.formattedValue}</p>
                <p className="text-xs text-gray-600">
                  {((datum.value / total) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>
        )}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 70,
            itemsSpacing: 20,
            itemWidth: 120,
            itemHeight: 20,
            itemTextColor: "#333",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionConfig={{
          mass: 1,
          tension: 170,
          friction: 26,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
        transitionMode="innerRadius"
        theme={{
          labels: {
            text: {
              fontSize: 16,
              fontWeight: 600,
              fontFamily: '"Inter", sans-serif',
            },
          },
          legends: {
            text: {
              fontSize: 14,
              fontFamily: '"Inter", sans-serif',
            },
          },
        }}
      />
      {/* Center total display */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Total Annual
          </p>
          <p className="text-3xl font-bold text-foreground">
            ${total.toLocaleString("en-AU")}
          </p>
          <p className="text-sm text-muted-foreground">per year</p>
        </div>
      </div>
    </div>
  );
}
