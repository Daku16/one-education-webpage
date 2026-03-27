import "../styles/globals.css"
import Navbar from "../components/layout/Navbar"
import { Footer } from "../components/layout/Footer"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ONE Education',
  icons: {
    icon: '/icon.png',  // Ruta desde public/ si lo prefieres ahí
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
