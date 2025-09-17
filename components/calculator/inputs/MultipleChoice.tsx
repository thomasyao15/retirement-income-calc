"use client"

import { motion } from "framer-motion"

interface MultipleChoiceProps {
  options: {
    value: string
    label: string
    color?: string
  }[]
  value?: string
  onChange: (value: string) => void
  columns?: number
}

const defaultColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500"
]

export default function MultipleChoice({
  options,
  value,
  onChange,
  columns = 2
}: MultipleChoiceProps) {
  const gridCols = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"

  return (
    <div className={`grid ${gridCols} gap-6 w-full`}>
      {options.map((option, index) => {
        const bgColor = option.color || defaultColors[index % defaultColors.length]
        const isSelected = value === option.value

        return (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              relative overflow-hidden rounded-3xl p-8 md:p-12
              min-h-[200px] md:min-h-[250px]
              flex items-center justify-center
              text-white font-bold text-3xl md:text-4xl lg:text-5xl
              transition-all duration-300 transform
              ${bgColor}
              ${isSelected
                ? "ring-8 ring-white ring-offset-8 ring-offset-background scale-105"
                : "hover:scale-105 active:scale-95"
              }
              shadow-2xl hover:shadow-3xl
            `}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <span className="relative z-10 text-center leading-tight px-4">
              {option.label}
            </span>

            {isSelected && (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        )
      })}
    </div>
  )
}