"use client"

import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  placeholder?: string
  autoFocus?: boolean
  disabled?: boolean
}

export default function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  placeholder = "",
  autoFocus = false,
  disabled = false
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0
    if (min !== undefined && newValue < min) return
    if (max !== undefined && newValue > max) return
    onChange(newValue)
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {prefix && (
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground pointer-events-none">
            {prefix}
          </span>
        )}
        <Input
          type="number"
          value={value || ""}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          className={`text-2xl py-8 ${prefix ? 'pl-12' : 'px-6'} ${suffix ? 'pr-24' : 'px-6'} text-center font-semibold rounded-2xl border-2 focus:border-primary`}
        />
        {suffix && (
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-medium text-muted-foreground pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </motion.div>
  )
}