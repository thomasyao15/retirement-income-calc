import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Direct - AustralianSuper",
  description: "Take control of your investments with Member Direct",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function LifetimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}