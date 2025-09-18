"use client";

import { useState } from "react";
import QuestionLayout from "@/components/calculator/QuestionLayout";
import NumericInput from "@/components/calculator/inputs/NumericInput";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function ExpectedLongevity() {
  const { personalInfo, updatePersonalInfo } = useCalculatorStore();
  const [years, setYears] = useState(personalInfo.expectedLongevity);
  const [error, setError] = useState("");

  const handleChange = (value: number | undefined) => {
    setYears(value);
    setError("");

    if (value !== undefined) {
      const currentAge = personalInfo.age || 65;
      if (value < currentAge) {
        setError(`Must be at least ${currentAge} years old`);
      } else if (value > 120) {
        setError("Please enter a valid age");
      } else {
        updatePersonalInfo({ expectedLongevity: value });
      }
    }
  };

  return (
    <QuestionLayout
      question="How long would you like your super to last?"
      subtitle="Plan for a retirement that could last 20, 30, or even 40+ years"
    >
      <div className="space-y-8 flex flex-col items-center justify-center">
        <NumericInput
          value={years}
          onChange={handleChange}
          min={personalInfo.age || 65}
          max={120}
          placeholder="90"
          error={error}
          autoFocus
        />
      </div>
    </QuestionLayout>
  );
}
