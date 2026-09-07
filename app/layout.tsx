import type { Metadata } from "next"
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-plex-mono",
})

export const metadata: Metadata = {
  title: "Rimba Awal Expedition | Private Guide Trekking TNGGP",
  description:
    "Trekking privat dengan guide khusus rombongan kamu. Rute sendiri, pace sendiri, di jantung hutan TNGGP, Situ Gunung Sukabumi.",
  keywords: [
    "private trip trekking",
    "guide privat situ gunung",
    "trekking TNGGP",
    "rimba awal expedition",
  ],
}

import { Navbar, Footer } from "@/components/layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${fraunces.variable} ${plexMono.variable}`}
    >
      <body className="bg-sand text-charcoal antialiased">
        <Navbar />
        {children}
        <Footer />
        <Script
          src={
            process.env.MIDTRANS_IS_PRODUCTION === "true"
              ? "https://app.midtrans.com/snap/snap.js"
              : "https://app.sandbox.midtrans.com/snap/snap.js"
          }
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
