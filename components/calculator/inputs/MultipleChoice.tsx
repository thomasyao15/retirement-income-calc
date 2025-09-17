"use client";

import { motion } from "framer-motion";

interface MultipleChoiceProps {
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange: (value: string) => void;
  columns?: number;
}

export default function MultipleChoice({
  options,
  value,
  onChange,
  columns = 2,
}: MultipleChoiceProps) {
  const gridCols = columns === 2 ? "grid-cols-2" : "grid-cols-1";

  return (
    <div
      className={`grid ${gridCols} gap-4 md:gap-6 w-full max-w-4xl mx-auto place-items-center px-4`}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;

        return (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              relative overflow-hidden rounded-3xl px-12 md:px-16 lg:px-20 py-8 md:py-10
              min-h-[160px] md:min-h-[200px]
              w-[320px] md:w-[380px] lg:w-[420px]
              flex items-center justify-center
              bg-white
              font-bold text-2xl md:text-3xl lg:text-4xl
              transition-all duration-300 transform
              ${
                isSelected
                  ? "border-8 border-[var(--as-tolopea)] text-[var(--as-tolopea)] scale-105"
                  : "border-4 border-[var(--as-tolopea)] text-[var(--as-tolopea)] hover:scale-105 active:scale-95 hover:border-8"
              }
            `}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.3,
            }}
          >
            <span className="relative z-10 text-center leading-tight px-4">
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
