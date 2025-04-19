// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import TechStack from '@/components/sections/TechStack'
import Footer from '@/components/sections/Footer'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: "Kristiyan Cholakov's Portfolio",
  description:
    'Professional portfolio of Kristiyan Cholakov - AI Developer & Software Engineer specializing in Web Development, Machine Learning, and Computer Vision.',
  // -- Favicon & Touch Icons --
  icons: {
    icon: '/favicon.svg', // primary SVG
    shortcut: '/favicon.ico', // classic .ico
    apple: '/apple-touch-icon.png', // iOS home‑screen
    other: [
      {
        rel: 'icon',
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  },
  // -- PWA Manifest --
  manifest: '/site.webmanifest',
  // -- Apple Web App Meta --
  appleWebApp: {
    title: 'KC',
    capable: true, // if you want standalone iOS behavior
    statusBarStyle: 'default',
  },
  // -- (Optional) theme-color for mobile address‑bar styling --
  themeColor: '#2a2a2a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
        <Footer />
      </body>
    </html>
  )
}
