"use client"

import { motion } from "framer-motion"

interface TextDisplayProps {
  title: string
  subtitle?: string
  content?: string
  highlight?: string
}

export default function TextDisplay({
  title,
  subtitle,
  content,
  highlight
}: TextDisplayProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      {content && (
        <motion.div
          className="text-xl md:text-2xl text-foreground/80 max-w-4xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {content}
        </motion.div>
      )}

      {highlight && (
        <motion.div
          className="mt-12 p-8 bg-primary/10 border-4 border-primary rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-3xl md:text-4xl font-bold text-primary">
            {highlight}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}