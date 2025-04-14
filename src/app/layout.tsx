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
  title: 'Kristiyan Cholakov',
  description:
    'Professional portfolio of Kristiyan Cholakov - AI Developer & Software Engineer specializing in Web Development, Machine Learning, and Computer Vision.',
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
