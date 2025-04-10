import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import TechStack from '@/components/sections/TechStack'
import Footer from '@/components/sections/Footer'
import ComingSoon from '@/components/sections/ComingSoon'

export const metadata: Metadata = {
  title: 'Kristiyan Cholakov',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <ComingSoon />
      </body>
    </html>
  )
}
