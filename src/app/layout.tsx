import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "РГКП Казавиалесоохрана",
  description: "Авиационная охрана лесов Казахстана",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
