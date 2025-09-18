"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useWizard } from "react-use-wizard"

export default function CallToAction() {
  const router = useRouter()
  const { nextStep } = useWizard()

  const handleGenerateForm = () => {
    // Move to summary page
    nextStep()
  }

  const handleLearnMore = () => {
    // Could navigate to Australian Super website or show more info
    window.open("https://www.australiansuper.com", "_blank")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <motion.div
        className="text-center space-y-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ready to secure your retirement?
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Take the next step towards your financial freedom
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleGenerateForm}
            size="lg"
            className="text-xl px-12 py-8 h-auto rounded-full bg-primary hover:bg-primary/90 min-w-[280px]"
          >
            Generate Pre-filled Form
          </Button>

          <Button
            onClick={handleLearnMore}
            size="lg"
            variant="outline"
            className="text-xl px-12 py-8 h-auto rounded-full border-2 border-primary text-primary hover:bg-primary/10 min-w-[280px]"
          >
            Learn More
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 p-8 bg-card border-2 border-border rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4">What happens next?</h3>
          <div className="text-left space-y-4 max-w-2xl mx-auto">
            <div className="flex gap-4">
              <span className="text-2xl">1️⃣</span>
              <div>
                <p className="font-semibold">Download your pre-filled form</p>
                <p className="text-muted-foreground">All your information ready to submit</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">2️⃣</span>
              <div>
                <p className="font-semibold">Review with our experts</p>
                <p className="text-muted-foreground">Free consultation to answer your questions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">3️⃣</span>
              <div>
                <p className="font-semibold">Start your retirement income</p>
                <p className="text-muted-foreground">Begin receiving your optimized payments</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          No obligation • Free consultation • Expert support
        </motion.p>
      </motion.div>
    </div>
  )
}