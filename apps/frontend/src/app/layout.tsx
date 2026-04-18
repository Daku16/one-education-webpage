import "../styles/globals.css"
import Navbar from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "ONE Education",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-100",
          "text-slate-900 text-base md:text-lg"
        )}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}