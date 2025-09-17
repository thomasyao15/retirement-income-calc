"use client";

import { motion } from "framer-motion";
import { useWizard } from "react-use-wizard";

interface AnimationWrapperProps {
  children: React.ReactNode;
}

// This wrapper is used by react-use-wizard to wrap each individual step
export default function AnimationWrapper({ children }: AnimationWrapperProps) {
  const { activeStep } = useWizard();

  return (
    <motion.div
      key={activeStep}
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 30,
        mass: 0.8,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
