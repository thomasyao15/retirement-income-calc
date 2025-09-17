"use client"

interface QuestionLayoutProps {
  question: string
  subtitle?: string
  children: React.ReactNode
}

export default function QuestionLayout({
  question,
  subtitle,
  children
}: QuestionLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      {/* Question Section */}
      <div className="w-full max-w-2xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {question}
        </h1>

        {subtitle && (
          <p className="text-xl text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {/* Input Section */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}