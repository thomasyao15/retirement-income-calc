"use client"

import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  type?: string
  disabled?: boolean
}

export default function TextInput({
  value,
  onChange,
  placeholder = "",
  autoFocus = false,
  type = "text",
  disabled = false
}: TextInputProps) {
  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        className="text-2xl py-8 px-6 text-center font-semibold rounded-2xl border-2 focus:border-primary"
      />
    </motion.div>
  )
}