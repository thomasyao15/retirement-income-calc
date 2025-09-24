"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface SectionCheckpointProps {
  currentSection: 1 | 2 | 3;
  title: string;
  subtitle: string;
  content: string;
}

export default function SectionCheckpoint({
  currentSection,
  title,
  subtitle,
  content,
}: SectionCheckpointProps) {
  const sections = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Age Pension" },
    { number: 3, label: "PreSet" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex justify-center items-center gap-4 my-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {sections.map((section, index) => (
            <div key={section.number} className="flex items-center">
              <motion.div
                className={`flex flex-col items-center ${
                  section.number <= currentSection
                    ? "opacity-100"
                    : "opacity-70"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                    section.number <= currentSection
                      ? "bg-primary border-primary"
                      : section.number === currentSection + 1
                      ? "bg-primary/20 border-primary animate-pulse"
                      : "bg-muted border-muted"
                  }`}
                >
                  {section.number <= currentSection ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <span
                      className={`text-xl font-bold ${
                        section.number === currentSection + 1
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {section.number}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    section.number <= currentSection
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                </p>
              </motion.div>
              {index < sections.length - 1 && (
                <div
                  className={`w-24 h-1 mx-2 mb-5 ${
                    section.number <= currentSection ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-xl md:text-2xl text-foreground/80 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {content}
        </motion.div>

        {/* <motion.div
          className="mt-12 p-8 bg-primary/10 border-4 border-primary rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-3xl md:text-4xl font-bold text-primary">
            Section {currentSection} of 3 Complete ✓
          </p>
        </motion.div> */}
      </motion.div>
    </div>
  );
}
