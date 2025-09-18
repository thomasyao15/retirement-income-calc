"use client"

import ConditionalQuestion from "@/components/calculator/ConditionalQuestion"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function IncomeStreams() {
  const { assets, updateAssets } = useCalculatorStore()

  return (
    <ConditionalQuestion
      binaryQuestion="Do you receive any regular income?"
      binarySubtitle="Such as rental income, dividends, or part-time work"
      amountQuestion="How much income do you receive per year?"
      amountSubtitle="Total annual income from all sources"
      onBinaryChange={(value) => updateAssets({ hasIncomeStreams: value })}
      onAmountChange={(value) => updateAssets({ incomeStreamsAmount: value })}
      defaultBinary={assets.hasIncomeStreams}
      defaultAmount={assets.incomeStreamsAmount}
      amountSuffix=" per year"
      min={0}
      max={500000}
      step={1000}
    />
  )
}