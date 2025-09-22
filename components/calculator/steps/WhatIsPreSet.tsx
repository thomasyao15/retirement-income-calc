"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCalculatorStore } from "@/store/calculatorStore";

export default function WhatIsPreSet() {
  const { setCurrentStepValid } = useCalculatorStore();

  useEffect(() => {
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-8 max-w-7xl w-full"
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
          What is a PreSet?
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          How we help members to maximise their retirement income & lifestyle
        </motion.p>

        {/* Main layout container */}
        <div className="flex items-start justify-center gap-0 mt-12">
          {/* Choice Income */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="relative p-6 rounded-full w-48 h-48 flex flex-col items-center justify-center bg-orange-100 border-orange-300 border-4 border-dashed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-bold text-orange-700 text-center">
                Choice
                <br />
                Income
              </h3>
            </motion.div>
            <motion.div
              className="p-6 bg-card border-2 border-border rounded-2xl w-72"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-base text-muted-foreground">
                Income for different lifestyle preferences e.g. Travelling,
                looking after grandchildren, starting a passion project
              </p>
            </motion.div>
          </div>

          {/* Plus Sign 1 */}
          <motion.div
            className="text-4xl font-bold text-foreground mt-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            +
          </motion.div>

          {/* Lifetime Income */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="relative p-6 rounded-full w-48 h-48 flex flex-col items-center justify-center bg-purple-100 border-purple-300 border-4 border-dashed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-lg font-bold text-purple-700 text-center">
                Lifetime
                <br />
                Income
              </h3>
            </motion.div>
            <motion.div
              className="p-6 bg-card border-2 border-border rounded-2xl w-72"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <p className="text-base text-muted-foreground">
                Supplement the aged pension for expenses. Increase the amount of
                Age Pension you can receive
              </p>
            </motion.div>
          </div>

          {/* Plus Sign 2 */}
          <motion.div
            className="text-4xl font-bold text-foreground mt-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
          >
            +
          </motion.div>

          {/* Age Pension */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="relative p-6 rounded-full w-48 h-48 flex flex-col items-center justify-center bg-gray-100 border-gray-300 border-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
            >
              <h3 className="text-lg font-bold text-gray-700 text-center">
                Age Pension
              </h3>
            </motion.div>
            <motion.div
              className="p-6 bg-card border-2 border-border rounded-2xl w-72"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-base text-muted-foreground">
                Income for core expenses e.g. food, electricity
              </p>
            </motion.div>
          </div>

          {/* Equals Sign */}
          <motion.div
            className="text-4xl font-bold text-foreground mt-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            =
          </motion.div>

          {/* Retirement Income */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="relative p-6 rounded-full w-48 h-48 flex flex-col items-center justify-center bg-orange-100 border-orange-500 border-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                boxShadow: [
                  "0 0 0 0 rgba(251, 146, 60, 0)",
                  "0 0 0 10px rgba(251, 146, 60, 0.3)",
                  "0 0 0 20px rgba(251, 146, 60, 0)",
                ],
              }}
              transition={{
                delay: 1.4,
                scale: {
                  duration: 0.5,
                },
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  delay: 2,
                },
              }}
            >
              <h3 className="text-lg font-bold text-orange-700 text-center">
                Retirement
                <br />
                Income
              </h3>
            </motion.div>
            <motion.div
              className="p-6 bg-card border-2 border-border rounded-2xl w-72"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <p className="text-base text-muted-foreground">
                These three income streams work together
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
