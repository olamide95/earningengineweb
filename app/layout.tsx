import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { SupportWidget } from "@/components/ui/support-widget"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Earning Engine - Master Trading & Investing",
  description:
    "Professional trading and investing education platform. Learn from experts with comprehensive courses on stocks, crypto, and financial markets.",
  keywords: "trading, investing, education, stocks, crypto, financial markets, courses",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          {children}
          <SupportWidget />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
