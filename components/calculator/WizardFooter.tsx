"use client";

import { useWizard } from "react-use-wizard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

interface WizardFooterProps {
  onNext?: () => Promise<boolean> | boolean;
}

export default function WizardFooter({ onNext }: WizardFooterProps) {
  const {
    previousStep,
    nextStep,
    isFirstStep,
    isLastStep,
    activeStep,
    stepCount,
  } = useWizard();

  const handleNext = async () => {
    // If custom onNext is provided, call it first
    if (onNext) {
      const canProceed = await onNext();
      if (!canProceed) return;
    }
    nextStep();
  };

  // Calculate progress percentage
  const progress = Math.min(
    100,
    Math.round(((activeStep + 1) / stepCount) * 100)
  );

  // Debug logging to see what values we're getting
  console.log("Progress debug:", { activeStep, stepCount, progress });

  return (
    <>
      <motion.footer
        className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-sm border-t border-gray-200"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Progress bar at top of footer */}
        <div className="absolute top-0 left-0 right-0 bg-gray-100 h-2 -translate-y-full">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="mx-auto px-4 pb-6 pt-8">
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
    </>
  );
}
