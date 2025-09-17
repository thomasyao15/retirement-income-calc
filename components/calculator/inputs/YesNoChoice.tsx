"use client";

import { motion } from "framer-motion";

interface YesNoChoiceProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

export default function YesNoChoice({ value, onChange }: YesNoChoiceProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
      <motion.button
        onClick={() => onChange(true)}
        className={`
          relative overflow-hidden rounded-3xl px-24 md:px-32 py-12 md:py-16
          min-h-[200px] md:min-h-[280px]
          min-w-[320px] md:min-w-[420px]
          flex items-center justify-center
          bg-white
          font-bold
          transition-all duration-300 transform
          ${
            value === true
              ? "border-8 border-[var(--as-grenadier)] text-[var(--as-grenadier)] scale-105"
              : "border-4 border-[var(--as-grenadier)] text-[var(--as-grenadier)] hover:scale-105 active:scale-95 hover:border-8"
          }
        `}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <span className="text-5xl md:text-6xl lg:text-7xl tracking-wide">
          Yes
        </span>
      </motion.button>

      <motion.button
        onClick={() => onChange(false)}
        className={`
          relative overflow-hidden rounded-3xl px-24 md:px-32 py-12 md:py-16
          min-h-[200px] md:min-h-[280px]
          min-w-[320px] md:min-w-[420px]
          flex items-center justify-center
          bg-white
          font-bold
          transition-all duration-300 transform
          ${
            value === false
              ? "border-8 border-[var(--as-tolopea)] text-[var(--as-tolopea)] scale-105"
              : "border-4 border-[var(--as-tolopea)] text-[var(--as-tolopea)] hover:scale-105 active:scale-95 hover:border-8"
          }
        `}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <span className="text-5xl md:text-6xl lg:text-7xl tracking-wide">
          No
        </span>
      </motion.button>
    </div>
  );
}
