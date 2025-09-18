import Navbar from "@/components/calculator/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
            <p className="text-lg text-muted-foreground text-center max-w-2xl mb-8">
              Welcome to Australian Super's Retirement Income Calculator. Let's
              plan your financial future together.
            </p>
            <Link href="/calculator">
              <Button
                size="lg"
                className="text-xl px-8 py-6 h-auto rounded-full bg-primary hover:bg-primary/90"
              >
                Start Calculator
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
