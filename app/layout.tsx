import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AustralianSuper - Retirement Income Calculator",
  description: "Calculate your retirement income with AustralianSuper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
