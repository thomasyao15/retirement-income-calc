"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function UnderstandingOptions() {
  const { setCurrentStepValid } = useCalculatorStore();

  useEffect(() => {
    // Info page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);
  const options = [
    {
      title: "Lifetime Income",
      description:
        "Guaranteed income for life, even if your investments run out",
      icon: "🛡️",
      highlight: "40% discount on Age Pension means test",
    },
    {
      title: "Choice Income",
      description: "Flexible withdrawals while your money continues to grow",
      icon: "📈",
      highlight: "Access when you need it",
    },
    {
      title: "Age Pension",
      description: "Government support you're entitled to",
      icon: "🏛️",
      highlight: "Maximised with our strategy",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-12 max-w-5xl"
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
          Your Three Pillars of Income
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          A balanced approach for a worry-free retirement
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              className="p-8 bg-card border-2 border-border rounded-3xl hover:border-primary transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
            >
              <div className="text-6xl mb-4">{option.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
              <p className="text-muted-foreground mb-6">{option.description}</p>
              <div className="p-3 bg-primary/10 rounded-xl">
                <p className="text-sm font-semibold text-primary">
                  {option.highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
