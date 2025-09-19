"use client";

import TextDisplay from "@/components/calculator/TextDisplay";

export default function PreMixIntro() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Your Retirement, Simplified"
        subtitle="We've designed the perfect retirement income strategy for you"
        content="AustralianSuper's Pre-Mix options combine three powerful income sources to give you the confidence to enjoy retirement. Each option is tailored to your Age Pension eligibility, ensuring you get the most from your super."
        highlight="Let's explore your personalized Pre-Mix recommendation"
      />
    </div>
  );
}
