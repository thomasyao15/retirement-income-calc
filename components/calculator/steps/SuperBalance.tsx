"use client"

import { useState } from "react"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import CurrencyInput from "@/components/calculator/inputs/CurrencyInput"

export default function SuperBalance() {
  const [balance, setBalance] = useState(0)

  return (
    <QuestionLayout
      question="What's your current super balance?"
      subtitle="Enter your approximate superannuation balance"
    >
      <CurrencyInput
        value={balance}
        onChange={setBalance}
        placeholder="500,000"
      />
    </QuestionLayout>
  )
}