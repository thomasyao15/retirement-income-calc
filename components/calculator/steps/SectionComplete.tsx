"use client"

import TextDisplay from "@/components/calculator/TextDisplay"

export default function SectionComplete() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Great progress!"
        subtitle="You've completed the personal information section"
        content="Now let's check your Age Pension eligibility to determine the best retirement income strategy for you."
        highlight="Section 1 of 3 Complete ✓"
      />
    </div>
  )
}