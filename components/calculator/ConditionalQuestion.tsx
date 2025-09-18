"use client"

import { useState, useEffect } from "react"
import { useWizard } from "react-use-wizard"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import MultipleChoice from "@/components/calculator/inputs/MultipleChoice"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"

interface ConditionalQuestionProps {
  binaryQuestion: string
  binarySubtitle?: string
  amountQuestion: string
  amountSubtitle?: string
  amountPrefix?: string
  amountSuffix?: string
  onBinaryChange: (value: boolean) => void
  onAmountChange: (value: number) => void
  defaultBinary?: boolean
  defaultAmount?: number
  min?: number
  max?: number
  step?: number
}

export default function ConditionalQuestion({
  binaryQuestion,
  binarySubtitle,
  amountQuestion,
  amountSubtitle,
  amountPrefix = "$",
  amountSuffix = "",
  onBinaryChange,
  onAmountChange,
  defaultBinary = false,
  defaultAmount = 0,
  min = 0,
  max = 10000000,
  step = 1000
}: ConditionalQuestionProps) {
  const { nextStep, previousStep } = useWizard()
  const [showAmount, setShowAmount] = useState(defaultBinary)
  const [hasAnswer, setHasAnswer] = useState<string>(defaultBinary ? "yes" : "")
  const [amount, setAmount] = useState(defaultAmount)

  const binaryOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ]

  useEffect(() => {
    const hasMoney = hasAnswer === "yes"
    setShowAmount(hasMoney)
    onBinaryChange(hasMoney)

    if (!hasMoney) {
      setAmount(0)
      onAmountChange(0)
    }
  }, [hasAnswer]) // Only depend on hasAnswer to avoid infinite loops

  useEffect(() => {
    if (showAmount && amount > 0) {
      onAmountChange(amount)
    }
  }, [amount, showAmount]) // Only depend on amount and showAmount

  if (!showAmount) {
    return (
      <QuestionLayout
        question={binaryQuestion}
        subtitle={binarySubtitle}
      >
        <MultipleChoice
          options={binaryOptions}
          value={hasAnswer}
          onChange={setHasAnswer}
          columns={2}
        />
      </QuestionLayout>
    )
  }

  return (
    <QuestionLayout
      question={amountQuestion}
      subtitle={amountSubtitle}
    >
      <CurrencyInput
        value={amount}
        onChange={setAmount}
        placeholder="0"
      />
    </QuestionLayout>
  )
}