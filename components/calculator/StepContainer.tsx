"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useWizard } from "react-use-wizard"
import { useState, useEffect } from "react"

interface StepContainerProps {
  children: React.ReactNode
}

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
}

export default function StepContainer({ children }: StepContainerProps) {
  const { activeStep } = useWizard()
  const [[page, direction], setPage] = useState([activeStep, 0])

  useEffect(() => {
    const newDirection = activeStep > page ? 1 : -1
    if (activeStep !== page) {
      setPage([activeStep, newDirection])
    }
  }, [activeStep, page])

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-16rem)]">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeStep}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="absolute inset-0"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}