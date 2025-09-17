"use client"

import { useState } from "react"
import QuestionLayout from "@/components/calculator/QuestionLayout"
import ScrollWheelInput from "@/components/calculator/inputs/ScrollWheelInput"

export default function ScrollWheelAge() {
  const [age, setAge] = useState(60)

  return (
    <QuestionLayout
      question="What's your current age?"
      subtitle="Scroll to select your age"
    >
      <ScrollWheelInput
        min={50}
        max={75}
        value={age}
        onChange={setAge}
        step={1}
      />
    </QuestionLayout>
  )
}