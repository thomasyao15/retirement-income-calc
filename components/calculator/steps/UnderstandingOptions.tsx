"use client";

import React, { useEffect } from "react";
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
    {
      title: "Total Retirement Income",
      description: "Your complete income solution for a worry-free retirement",
      icon: "💰",
      highlight: "All three pillars combined",
      isTotal: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-12 flex flex-col items-center w-full"
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
          className="text-xl md:text-2xl text-muted-foreground max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          We&apos;ve designed a PreSet strategy that combines three income
          sources to give you the best possible retirement.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          {options.map((option, index) => (
            <React.Fragment key={option.title}>
              {/* Add + or = sign before the card (except for the first one) */}
              {index === 3 && (
                <motion.div
                  className="text-4xl font-bold text-muted-foreground mx-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  =
                </motion.div>
              )}
              {index > 0 && index < 3 && (
                <motion.div
                  className="text-4xl font-bold text-muted-foreground mx-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  +
                </motion.div>
              )}

              <motion.div
                key={option.title}
                className={`p-6 bg-card border-2 border-border rounded-3xl hover:border-primary transition-colors`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                style={{ width: "250px", minHeight: "280px" }}
              >
                <div className="text-5xl mb-3 text-center">{option.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-center">
                  {option.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  {option.description}
                </p>
                <div className="p-2 bg-primary/10 rounded-xl">
                  <p className="text-xs font-semibold text-primary text-center">
                    {option.highlight}
                  </p>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
