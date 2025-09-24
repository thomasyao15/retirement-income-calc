"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Circle, Phone } from "lucide-react";
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

  const steps = [
    {
      title: "Log in to your member portal",
      description:
        "Access your AustralianSuper account online to manage your retirement settings",
    },
    {
      title: `Select PreSet ${calculations.recommendedPreMix || "C"}`,
      description:
        "Choose the recommended PreSet option from your retirement income settings",
    },
    {
      title: "Download your pre-filled form",
      description:
        "Get your personalised application with all your details already completed",
    },
  ];

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
            <p className="text-2xl font-bold text-orange-600 mb-2 w-xl">
              We recommend you use
            </p>
            <div className="text-6xl font-bold text-orange-600">
              PreSet {calculations.recommendedPreMix || "C"}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="p-8 px-14 bg-card border-2 border-border rounded-3xl max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8">Next Steps</h3>

          {/* Vertical Stepper */}
          <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex items-start gap-6 text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {/* Separator Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-20 bg-muted" />
                )}

                {/* Step Circle */}
                <div className="relative z-10">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${
                      index === 0
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                  >
                    {index === 0 ? (
                      <Circle className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-semibold">{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-2">
                  <h4
                    className={`
                    text-lg font-semibold mb-1
                    ${index === 0 ? "text-primary" : "text-foreground"}
                  `}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`
                    text-sm
                    ${index === 0 ? "text-primary/80" : "text-muted-foreground"}
                  `}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              onClick={handleCallAdvisor}
              size="lg"
              variant="outline"
              className="text-xl px-12 py-8 h-auto rounded-full border-2 border-primary text-primary hover:bg-primary/10 min-w-[320px] flex items-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Or Call a Financial Advisor
            </Button>
          </motion.div>
        </motion.div>

        {/* Call Financial Advisor Button */}
      </motion.div>
    </div>
  );
}
