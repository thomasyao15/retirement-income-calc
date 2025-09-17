"use client"

import { motion } from "framer-motion"
import { useWizard } from "react-use-wizard"

interface AnimationWrapperProps {
  children: React.ReactNode
}

// This wrapper is used by react-use-wizard to wrap each individual step
export default function AnimationWrapper({ children }: AnimationWrapperProps) {
  const { activeStep } = useWizard()

  return (
    <motion.div
      key={activeStep}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}