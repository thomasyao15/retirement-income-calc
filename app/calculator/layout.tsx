import Navbar from "@/components/calculator/Navbar"
import ProgressBar from "@/components/calculator/ProgressBar"

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        {children}
      </main>
      <ProgressBar />
    </>
  )
}