"use client"

import ConditionalQuestion from "@/components/calculator/ConditionalQuestion"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function SharesInvestment() {
  const { assets, updateAssets } = useCalculatorStore()

  return (
    <ConditionalQuestion
      binaryQuestion="Do you own shares or managed funds?"
      binarySubtitle="Including ETFs, stocks, bonds, and managed investments"
      amountQuestion="What's the total value of your shares?"
      amountSubtitle="Current market value of all shares and managed funds"
      onBinaryChange={(value) => updateAssets({ hasShares: value })}
      onAmountChange={(value) => updateAssets({ sharesValue: value })}
      defaultBinary={assets.hasShares}
      defaultAmount={assets.sharesValue}
      min={0}
      max={10000000}
      step={1000}
    />
  )
}