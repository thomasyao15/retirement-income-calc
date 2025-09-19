"use client";

import TextDisplay from "@/components/calculator/TextDisplay";

export default function AgePensionIntro() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Did you know?"
        subtitle="The Age Pension can provide up to $43,752 per year"
        content="Most Australians are eligible for some level of Age Pension. Let's check what you could receive to boost your retirement income. With AustralianSuper's lifetime income products, you could increase your Age Pension by up to 40%."
        highlight="Let's unlock your Age Pension"
      />
    </div>
  );
}
