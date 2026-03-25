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
  title: "Code Pop - Your Coding Practice Companion",
  description: "Understand algorithms, debug code, and solve coding challenges faster with AI assistance",
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
        <div className="fixed inset-0 bg-[#0d1117]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,136,0.04),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,212,255,0.04),transparent_60%)]" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
