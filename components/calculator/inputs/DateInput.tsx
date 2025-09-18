"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateInputProps {
  value?: Date
  onChange: (value: Date | undefined) => void
  placeholder?: string
}

export default function DateInput({
  value,
  onChange,
  placeholder = "Select date"
}: DateInputProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    onChange(date)
    setOpen(false)
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal text-xl py-8 px-6 rounded-2xl border-2",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-4 h-6 w-6" />
            {value ? format(value, "dd MMMM yyyy") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            initialFocus
            fromYear={1920}
            toYear={new Date().getFullYear()}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}