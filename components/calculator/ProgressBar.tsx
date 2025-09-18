"use client"

import { usePathname } from "next/navigation"

export default function ProgressBar() {
  const pathname = usePathname()

  // Only show progress bar on calculator page
  // The actual progress will be managed by WizardProgress component inside the wizard
  if (pathname !== "/calculator") {
    return null
  }

  // Default progress bar for non-calculator pages or loading state
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 h-2 z-50">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: "0%" }}
      />
    </div>
  )
}