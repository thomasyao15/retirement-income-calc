"use client"

import { useWizard } from "react-use-wizard"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"

interface WizardFooterProps {
  onNext?: () => Promise<boolean> | boolean
}

export default function WizardFooter({ onNext }: WizardFooterProps) {
  const {
    previousStep,
    nextStep,
    isFirstStep,
    isLastStep
  } = useWizard()

  const handleNext = async () => {
    // If custom onNext is provided, call it first
    if (onNext) {
      const canProceed = await onNext()
      if (!canProceed) return
    }
    nextStep()
  }

  return (
    <motion.footer
      className="fixed bottom-2 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative flex items-center justify-center">
          {/* Previous Button - Left side */}
          {!isFirstStep && (
            <button
              onClick={previousStep}
              className="absolute left-0 p-3 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="h-8 w-8 text-foreground" />
            </button>
          )}

          {/* Next/Submit Button - Center */}
          <Button
            onClick={handleNext}
            size="lg"
            className={`
              min-w-[160px] h-14 md:h-16
              text-lg md:text-xl font-medium
              rounded-full
              bg-primary hover:bg-primary/90
              text-primary-foreground
              transition-all duration-200
              hover:scale-105
              active:scale-95
            `}
          >
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </motion.footer>
  )
}