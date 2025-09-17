"use client"

import TextDisplay from "@/components/calculator/TextDisplay"

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <TextDisplay
        title="Welcome to your retirement journey"
        subtitle="Let's plan your future together"
        content="We'll ask you a few questions to understand your situation and help you make the best decisions for your retirement."
        highlight="Ready to get started?"
      />
    </div>
  )
}