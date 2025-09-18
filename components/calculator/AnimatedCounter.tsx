"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValueEvent } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  formatAsCurrency?: boolean
  onComplete?: () => void
}

export default function AnimatedCounter({
  value,
  delay = 1000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  formatAsCurrency = true,
  onComplete
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(
    formatAsCurrency ? "$0" : "0"
  )

  const spring = useSpring(0, {
    damping: 30,
    stiffness: 80,
    restDelta: 0.001
  })

  useMotionValueEvent(spring, "change", (latest) => {
    if (formatAsCurrency) {
      setDisplayValue(new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(latest))
    } else {
      setDisplayValue(latest.toFixed(decimals))
    }

    if (onComplete && Math.abs(latest - value) < 0.1) {
      onComplete()
    }
  })

  useEffect(() => {
    // Start from 0 immediately
    spring.set(0)

    // Delay the animation start
    const timer = setTimeout(() => {
      spring.set(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, spring, delay])

  return (
    <motion.div
      className={`text-6xl md:text-7xl lg:text-8xl font-bold text-green-600 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>
        {prefix}
        {displayValue}
        {suffix}
      </span>
    </motion.div>
  )
}