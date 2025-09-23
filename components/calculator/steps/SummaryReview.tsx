"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCalculatorStore } from "@/store/calculatorStore";
import { Button } from "@/components/ui/button";

export default function SummaryReview() {
  const {
    personalInfo,
    assets,
    pensionData,
    calculations,
    setCurrentStepValid,
  } = useCalculatorStore();

  useEffect(() => {
    // Summary page is always valid
    setCurrentStepValid(true);
  }, [setCurrentStepValid]);

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === 0) return "$0";
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const sections = [
    {
      title: "Personal Information",
      items: [
        {
          label: "Age",
          value: personalInfo.age
            ? `${personalInfo.age} years`
            : "Not provided",
        },
        { label: "Gender", value: personalInfo.gender || "Not provided" },
        {
          label: "Relationship Status",
          value: personalInfo.relationshipStatus || "Not provided",
        },
        {
          label: "Expected Retirement Age",
          value: personalInfo.retirementAge
            ? `${personalInfo.retirementAge} years`
            : "Not provided",
        },
        {
          label: "Expected Longevity",
          value: personalInfo.expectedLongevity
            ? `${personalInfo.expectedLongevity} years`
            : "Not provided",
        },
      ],
    },
    {
      title: "Financial Assets",
      items: [
        {
          label: "Super Balance",
          value: formatCurrency(personalInfo.superBalance),
        },
        {
          label: "Total Assets (outside super)",
          value: formatCurrency(personalInfo.totalAssets),
        },
        {
          label: "Income Streams",
          value: assets.hasIncomeStreams
            ? `${formatCurrency(assets.incomeStreamsAmount)}/year`
            : "No",
        },
      ],
    },
    {
      title: "Age Pension Information",
      items: [
        {
          label: "Home Ownership",
          value: pensionData.homeOwnership || "Not provided",
        },
        {
          label: "Combined Income",
          value: formatCurrency(pensionData.combinedIncome),
        },
      ],
    },
    {
      title: "Your Retirement Income Plan",
      highlight: true,
      items: [
        {
          label: "Age Pension Eligibility",
          value: calculations.pensionEligibility || "Not calculated",
        },
        {
          label: "Estimated Age Pension",
          value: `${formatCurrency(calculations.estimatedPension)}/year`,
        },
        {
          label: "Recommended Pre-Mix",
          value: `Option ${calculations.recommendedPreMix}` || "Not determined",
        },
        {
          label: "Lifetime Income",
          value: `${formatCurrency(calculations.lifetimeIncome)}/year`,
        },
        {
          label: "Choice Income",
          value: `${formatCurrency(calculations.choiceIncome)}/year`,
        },
        {
          label: "Total Annual Income",
          value: `${formatCurrency(calculations.totalRetirementIncome)}/year`,
          highlight: true,
        },
      ],
    },
  ];

  const handleDownload = () => {
    // Generate PDF or download functionality
    console.log("Downloading summary...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Review Your Information
          </h1>
          <p className="text-xl text-muted-foreground">
            Here's everything we've captured for your retirement plan
          </p>
        </motion.div>

        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            className={`p-8 rounded-3xl ${
              section.highlight
                ? "bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary"
                : "bg-card border-2 border-border"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + sectionIndex * 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                    item.highlight
                      ? "bg-primary/20 border border-primary"
                      : "bg-background/50"
                  }`}
                >
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span
                    className={`font-semibold ${
                      item.highlight
                        ? "text-primary text-xl"
                        : "text-foreground"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center pt-8 pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={handleDownload}
            size="lg"
            className="text-lg px-8 py-6 h-auto rounded-full"
          >
            Download Summary
          </Button>
          <Button
            onClick={handlePrint}
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 h-auto rounded-full"
          >
            Print Summary
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
