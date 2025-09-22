import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - AustralianSuper",
  description: "AustralianSuper member portal",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
