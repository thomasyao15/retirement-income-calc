"use client"

import ConditionalQuestion from "@/components/calculator/ConditionalQuestion"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function BankMoney() {
  const { assets, updateAssets } = useCalculatorStore()

  return (
    <ConditionalQuestion
      binaryQuestion="Do you have money in the bank?"
      binarySubtitle="Including savings accounts, term deposits, and cash"
      amountQuestion="How much do you have in the bank?"
      amountSubtitle="Include all savings accounts, term deposits, and cash"
      onBinaryChange={(value) => updateAssets({ hasBankMoney: value })}
      onAmountChange={(value) => updateAssets({ bankMoneyAmount: value })}
      defaultBinary={assets.hasBankMoney}
      defaultAmount={assets.bankMoneyAmount}
      min={0}
      max={5000000}
      step={1000}
    />
  )
}