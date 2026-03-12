import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Pop - AI Coding Assistant",
  description: "Explain, debug, and generate code with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 bg-[linear-gradient(135deg,#7c3aed_0%,#1e3a8a_33%,#000000_66%,#064e3b_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.2),transparent,transparent)]" />
          <div className="absolute inset-0 backdrop-blur-3xl bg-black/30" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
