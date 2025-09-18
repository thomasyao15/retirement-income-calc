"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useWizard } from "react-use-wizard"
import { Check, Circle, Phone } from "lucide-react"

export default function CallToAction() {
  const router = useRouter()
  const { nextStep } = useWizard()

  const handleGenerateForm = () => {
    // Move to summary page
    nextStep()
  }

  const handleCallAdvisor = () => {
    // Could trigger phone call or show contact modal
    window.location.href = "tel:1300-300-273" // Australian Super contact number
  }

  const steps = [
    {
      title: "Download your personalized report",
      description: "Get your pre-filled application with all your retirement income projections"
    },
    {
      title: "Speak with a retirement specialist",
      description: "Free consultation to review your options and answer any questions"
    },
    {
      title: "Activate your retirement income",
      description: "Start receiving your optimized payments and enjoy financial security"
    }
  ]

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
            onClick={handleCallAdvisor}
            size="lg"
            variant="outline"
            className="text-xl px-12 py-8 h-auto rounded-full border-2 border-primary text-primary hover:bg-primary/10 min-w-[280px] flex items-center gap-3"
          >
            <Phone className="w-6 h-6" />
            Call a Financial Advisor
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 p-8 bg-card border-2 border-border rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8">What happens next?</h3>

          {/* Vertical Stepper */}
          <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex items-start gap-6 text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {/* Separator Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-20 bg-muted" />
                )}

                {/* Step Circle */}
                <div className="relative z-10">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${index === 0
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {index === 0 ? (
                      <Circle className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-semibold">{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-2">
                  <h4 className={`
                    text-lg font-semibold mb-1
                    ${index === 0 ? 'text-primary' : 'text-foreground'}
                  `}>
                    {step.title}
                  </h4>
                  <p className={`
                    text-sm
                    ${index === 0 ? 'text-primary/80' : 'text-muted-foreground'}
                  `}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}