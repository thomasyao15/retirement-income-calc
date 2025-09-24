"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function CallToAction() {
  const { setCurrentStepValid, calculations } = useCalculatorStore();

  useEffect(() => {
    // CTA page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  const handleCallAdvisor = () => {
    // Could trigger phone call or show contact modal
    window.location.href = "tel:1300-300-273"; // AustralianSuper contact number
  };

  const handleMemberPortal = () => {
    // Open member portal in new tab
    window.open("https://www.australiansuper.com/login", "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-8 max-w-7xl flex flex-col items-center w-full py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ready to secure your retirement?
        </motion.h1>

        {/* Recommended PreSet Badge */}
        <motion.div
          className="my-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex flex-col items-center p-8 bg-orange-50 border-4 border-orange-400 rounded-3xl">
            <div className="text-6xl font-bold text-orange-600 mb-2">
              PreSet 3
            </div>
            <p className="text-2xl font-bold text-orange-600">
              could best meet your needs
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={handleCallAdvisor}
            size="lg"
            variant="outline"
            className="text-2xl px-12 py-8 h-auto rounded-full border-2 border-primary text-primary hover:bg-primary/10 w-[420px] flex items-center justify-center gap-3"
          >
            <Phone className="w-6 h-6" />
            Call a Financial Advisor
          </Button>
          <Button
            onClick={handleMemberPortal}
            size="lg"
            className="text-2xl px-12 py-8 h-auto rounded-full w-[420px] flex items-center justify-center"
          >
            Learn More at Member Portal
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
