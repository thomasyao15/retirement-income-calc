"use client";

import { useEffect } from "react";
import TextDisplay from "@/components/calculator/TextDisplay";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function PreMixIntro() {
  const { setCurrentStepValid } = useCalculatorStore();

  useEffect(() => {
    // Info page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Your Retirement, Simplified"
        content="AustralianSuper's PreSet options combine three powerful income sources to give you the confidence to enjoy retirement. Each option is tailored to your Age Pension eligibility, ensuring you get the most from your super."
      />
    </div>
  );
}
