"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Logo from "@/app/assets/AustralianSuper_logo.svg"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      {/* Top section with tabs - full width Mischka background */}
      <div className="border-b border-gray-200 bg-muted">
        <div className="mx-auto">
          <div className="flex items-center h-12">
            <button className="px-6 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">
              INDIVIDUALS
            </button>
            <button className="px-6 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">
              EMPLOYERS
            </button>
            <button className="px-6 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary">
              ADVISERS
            </button>
          </div>
        </div>
      </div>

      {/* Main navbar section - white background with padding */}
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <Image
              src={Logo}
              alt="Australian Super"
              width={200}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Right side navigation */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              ABOUT US
            </button>
            <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              HELP & SUPPORT
            </button>

            {/* Search icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>

            {/* Login button - chamois color */}
            <Button
              variant="outline"
              className="bg-[#EDE1B5] hover:bg-[#E5D5A0] text-foreground border-[#EDE1B5] font-medium px-6 rounded-full"
            >
              LOGIN
            </Button>

            {/* Join button - grenadier color */}
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 rounded-full"
            >
              JOIN
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}