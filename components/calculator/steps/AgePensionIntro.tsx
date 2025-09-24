"use client";

import { useEffect } from "react";
import TextDisplay from "@/components/calculator/TextDisplay";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function AgePensionIntro() {
  const { setCurrentStepValid } = useCalculatorStore();

  useEffect(() => {
    // Info page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Did you know?"
        subtitle="The Age Pension can provide up to $46,202 per year"
        content="Most Australians are eligible for some level of Age Pension. Let's check what you could receive to boost your retirement income."
        highlight="Let's unlock your Age Pension"
      />
    </div>
  );
}
