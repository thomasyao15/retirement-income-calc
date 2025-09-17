import Navbar from "@/components/calculator/Navbar"
import ProgressBar from "@/components/calculator/ProgressBar"

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main content area */}
      <main className="min-h-screen bg-white pt-32 pb-8">
        <div className="mx-auto max-w-4xl px-4">
          {/* Placeholder content */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Retirement Income Calculator
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl">
              Welcome to Australian Super's Retirement Income Calculator.
              Let's plan your financial future together.
            </p>
          </div>
        </div>
      </main>

      <ProgressBar />
    </>
  )
}