"use client"

import ConditionalQuestion from "@/components/calculator/ConditionalQuestion"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function InvestmentProperty() {
  const { assets, updateAssets } = useCalculatorStore()

  return (
    <ConditionalQuestion
      binaryQuestion="Do you own any investment properties?"
      binarySubtitle="Properties other than your primary residence"
      amountQuestion="What's the total value of your investment properties?"
      amountSubtitle="Current market value minus any outstanding mortgages"
      onBinaryChange={(value) => updateAssets({ hasInvestmentProperty: value })}
      onAmountChange={(value) => updateAssets({ investmentPropertyValue: value })}
      defaultBinary={assets.hasInvestmentProperty}
      defaultAmount={assets.investmentPropertyValue}
      min={0}
      max={50000000}
      step={10000}
    />
  )
}