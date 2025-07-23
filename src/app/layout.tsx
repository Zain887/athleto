// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "ATHLETO - Tracksuit Brand",
  description: "Premium tracksuits for Men, Women, and Kids – Shop online at ATHLETO.",
  icons: {
    icon: "/favicon.png", // Make sure this file exists in your /public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}  cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
