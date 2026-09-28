import type { Metadata } from "next";
import { Ovo, Work_Sans } from "next/font/google";
import "./globals.css";

const ovo = Ovo({ weight: "400", subsets: ["latin"], variable: "--font-ovo" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });

export const metadata: Metadata = {
  title: "Co-Ventures design system",
  description: "Tokens, components and rules for everything Co-Ventures builds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ovo.variable} ${workSans.variable} font-sans`}>
      <body>{children}</body>
    </html>
  );
}
