"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

interface YesNoChoiceProps {
  value?: boolean
  onChange: (value: boolean) => void
}

export default function YesNoChoice({ value, onChange }: YesNoChoiceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <motion.button
        onClick={() => onChange(true)}
        className={`
          relative overflow-hidden rounded-3xl p-12 md:p-16
          min-h-[250px] md:min-h-[300px]
          flex flex-col items-center justify-center gap-6
          text-white font-bold
          transition-all duration-300 transform
          bg-green-500
          ${value === true
            ? "ring-8 ring-white ring-offset-8 ring-offset-background scale-105"
            : "hover:scale-105 active:scale-95"
          }
          shadow-2xl hover:shadow-3xl
        `}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        <Check className="w-20 h-20 md:w-24 md:h-24" strokeWidth={3} />
        <span className="text-4xl md:text-5xl lg:text-6xl">
          Yes
        </span>

        {value === true && (
          <motion.div
            className="absolute inset-0 bg-white/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      <motion.button
        onClick={() => onChange(false)}
        className={`
          relative overflow-hidden rounded-3xl p-12 md:p-16
          min-h-[250px] md:min-h-[300px]
          flex flex-col items-center justify-center gap-6
          text-white font-bold
          transition-all duration-300 transform
          bg-red-500
          ${value === false
            ? "ring-8 ring-white ring-offset-8 ring-offset-background scale-105"
            : "hover:scale-105 active:scale-95"
          }
          shadow-2xl hover:shadow-3xl
        `}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        <X className="w-20 h-20 md:w-24 md:h-24" strokeWidth={3} />
        <span className="text-4xl md:text-5xl lg:text-6xl">
          No
        </span>

        {value === false && (
          <motion.div
            className="absolute inset-0 bg-white/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </div>
  )
}