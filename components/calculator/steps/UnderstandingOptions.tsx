"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function UnderstandingOptions() {
  const { setCurrentStepValid, calculations } = useCalculatorStore();

  useEffect(() => {
    // Info page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);
  const options = [
    {
      title: "Lifetime Income (30%)",
      description:
        "Guaranteed income for life, even if your investments run out",
      icon: "/assets/stewardship_spot-illus_sand-circle_rgb-280x280.png",
      highlight: "40% discount on Age Pension means test",
    },
    {
      title: "Choice Income (70%)",
      description: "Flexible withdrawals while your money continues to grow",
      icon: "/assets/arrow-graph_spot-illus_sand-circle_rgb-280x280.png",
      highlight: "Access when you need it",
    },
    {
      title: "Age Pension",
      description: "Government support you're entitled to",
      icon: "/assets/TTR-income_spot-illus_sand-circle_rgb-280x280.png",
      highlight: "Maximised with our strategy",
    },
    {
      title: "Total Retirement Income",
      description: "Your complete income solution for a worry-free retirement",
      icon: "/assets/money-bag_spot-illus_sand-circle_rgb-280x280.png",
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

        {/* Recommended PreSet Badge */}
        <motion.div
          className="my-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
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

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
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
                style={{ width: "310px", minHeight: "300px" }}
              >
                <div className="flex justify-center mb-3">
                  <Image
                    src={option.icon}
                    alt={option.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  {option.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-4 text-center">
                  {option.description}
                </p>
                <div className="p-2 bg-primary/10 rounded-xl">
                  <p className="text-sm font-semibold text-primary text-center">
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
