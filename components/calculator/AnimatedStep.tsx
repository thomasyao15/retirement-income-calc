"use client"

import { motion } from "framer-motion"

interface AnimatedStepProps {
  children: React.ReactNode
}

export default function AnimatedStep({ children }: AnimatedStepProps) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}