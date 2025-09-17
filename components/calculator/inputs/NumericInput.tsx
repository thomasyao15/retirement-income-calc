"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { scaleVariants } from "@/styles/animations/variants"

interface NumericInputProps {
  value?: number
  onChange: (value: number | undefined) => void
  min?: number
  max?: number
  placeholder?: string
  label?: string
  helperText?: string
  error?: string
  autoFocus?: boolean
}

export default function NumericInput({
  value,
  onChange,
  min,
  max,
  placeholder = "0",
  label,
  helperText,
  error,
  autoFocus = true
}: NumericInputProps) {
  const [inputValue, setInputValue] = useState(value?.toString() || "")
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setInputValue(value?.toString() || "")
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    // Allow empty string
    if (val === "") {
      setInputValue("")
      onChange(undefined)
      return
    }

    // Only allow numbers
    if (!/^\d*$/.test(val)) {
      return
    }

    const numVal = parseInt(val, 10)

    // Check bounds
    if (min !== undefined && numVal < min) return
    if (max !== undefined && numVal > max) return

    setInputValue(val)
    onChange(numVal)
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-lg font-medium text-foreground mb-3">
          {label}
        </label>
      )}

      <motion.div
        className="relative"
        variants={scaleVariants}
        initial="normal"
        whileHover="hover"
        whileTap="tap"
      >
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            w-full
            px-8 py-6
            text-3xl md:text-4xl
            font-semibold
            text-center
            text-foreground
            bg-white
            border-3 rounded-2xl
            transition-all duration-200
            placeholder:text-muted-foreground/50
            focus:outline-none
            focus:ring-4
            focus:ring-primary/20
            ${
              error
                ? "border-destructive focus:ring-destructive/20"
                : isFocused
                ? "border-primary"
                : "border-gray-300 hover:border-gray-400"
            }
          `}
        />

        {/* Focus indicator */}
        {isFocused && !error && (
          <motion.div
            className="absolute inset-0 rounded-2xl ring-4 ring-primary/20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Error message only */}
      {error && (
        <p className="mt-3 text-base text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}