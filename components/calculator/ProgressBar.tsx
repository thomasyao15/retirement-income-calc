"use client"

export default function ProgressBar() {
  // Placeholder 50% progress for now
  const progress = 50

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 h-2 z-50">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}