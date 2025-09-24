"use client";

import { useEffect } from "react";
import TextDisplay from "@/components/calculator/TextDisplay";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function SectionComplete() {
  const { setCurrentStepValid } = useCalculatorStore();

  useEffect(() => {
    // Info page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Great progress!"
        subtitle="You've completed the personal information section"
        content="Now let's check your Age Pension eligibility to determine the best retirement income strategy for you."
        highlight="Section 1 of 3 Complete ✓"
      />
    </div>
  );
}
