"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ScrollWheelInputProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  label?: string
  step?: number
}

export default function ScrollWheelInput({
  min,
  max,
  value,
  onChange,
  label,
  step = 1
}: ScrollWheelInputProps) {
  const [internalValue, setInternalValue] = useState(value)
  const wheelRef = useRef<HTMLDivElement>(null)
  const itemHeight = 80

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const index = Math.round(scrollTop / itemHeight)
    const newValue = Math.min(max, Math.max(min, min + index * step))
    setInternalValue(newValue)
    onChange(newValue)
  }

  useEffect(() => {
    if (wheelRef.current) {
      const index = Math.floor((value - min) / step)
      wheelRef.current.scrollTop = index * itemHeight
    }
  }, [value, min, step])

  const items = []
  for (let i = min; i <= max; i += step) {
    items.push(i)
  }

  return (
    <div className="flex flex-col items-center">
      {label && (
        <label className="text-2xl font-medium text-muted-foreground mb-4">
          {label}
        </label>
      )}

      <div className="relative w-full max-w-xs">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-20 border-y-4 border-primary bg-primary/5 pointer-events-none z-20" />

        <div
          ref={wheelRef}
          className="h-96 overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
          onScroll={handleScroll}
        >
          <div className="py-40">
            {items.map((item) => (
              <motion.div
                key={item}
                className={`h-20 flex items-center justify-center snap-center ${
                  item === internalValue
                    ? "text-5xl font-bold text-foreground"
                    : "text-3xl text-muted-foreground/50"
                }`}
                animate={{
                  scale: item === internalValue ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}