"use client";

import { useState, useEffect } from "react";
import QuestionLayout from "@/components/calculator/QuestionLayout";
import NumericInput from "@/components/calculator/inputs/NumericInput";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function ExpectedLongevity() {
  const { personalInfo, updatePersonalInfo, setCurrentStepValid } =
    useCalculatorStore();
  const [years, setYears] = useState(personalInfo.retirementYears);
  const [error, setError] = useState("");

  useEffect(() => {
    const isValid = years !== undefined && years >= 1 && years <= 50;
    setCurrentStepValid(isValid);
  }, [years, setCurrentStepValid]);

  const handleChange = (value: number | undefined) => {
    setYears(value);
    setError("");

    if (value !== undefined) {
      if (value < 1) {
        setError("Must be at least 1 year");
      } else if (value > 50) {
        setError("Maximum 50 years");
      } else {
        updatePersonalInfo({
          retirementYears: value,
          expectedLongevity: (personalInfo.age || 65) + value,
        });
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
          min={1}
          max={50}
          placeholder="25"
          error={error}
          autoFocus
        />
        <p className="text-2xl text-muted-foreground">years</p>
      </div>
    </QuestionLayout>
  );
}
