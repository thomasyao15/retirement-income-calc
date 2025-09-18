"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface IncomeBreakdownChartProps {
  lifetimeIncome: number
  choiceIncome: number
  agePension: number
  className?: string
}

const COLORS = {
  lifetime: "#10b981",
  choice: "#3b82f6",
  pension: "#f59e0b"
}

export default function IncomeBreakdownChart({
  lifetimeIncome = 0,
  choiceIncome = 0,
  agePension = 0,
  className = ""
}: IncomeBreakdownChartProps) {
  const data = useMemo(() => [
    { name: "Lifetime Income", value: Math.max(0, lifetimeIncome), color: COLORS.lifetime },
    { name: "Choice Income", value: Math.max(0, choiceIncome), color: COLORS.choice },
    { name: "Age Pension", value: Math.max(0, agePension), color: COLORS.pension }
  ], [lifetimeIncome, choiceIncome, agePension])

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            animationBegin={200}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}