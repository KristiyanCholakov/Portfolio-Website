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

// Analytics
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://kristiyancholakov.com'),
  title: {
    default: 'Kristiyan Cholakov | AI & Software Engineer',
    template: '%s | Kristiyan Cholakov',
  },
  description:
    'Official portfolio of Kristiyan Cholakov – AI & Data Science Engineer. Discover projects, experience, and expertise in Artificial Intelligence, Machine Learning, Computer Vision, and Web Development.',
  keywords: [
    'Kristiyan Cholakov',
    'Кристиян Чолаков',
    'AI Engineer',
    'Artificial Intelligence',
    'Изкуствен интелект',
    'Data Scientist',
    'Web Developer',
    'Machine Learning',
    'Computer Vision',
    'Next.js Portfolio',
    'Software Engineer Portfolio',
  ],
  authors: [{ name: 'Kristiyan Cholakov', url: 'https://kristiyancholakov.com' }],
  creator: 'Kristiyan Cholakov',
  openGraph: {
    title: 'Kristiyan Cholakov | AI & Software Engineer',
    description:
      'Explore the professional portfolio of Kristiyan Cholakov – Web Developer, AI Engineer, and Machine Learning Specialist.',
    url: 'https://kristiyancholakov.com',
    siteName: 'Kristiyan Cholakov Portfolio',
    images: [
      {
        url: '/preview.png',
        width: 1250,
        height: 670,
        alt: 'Kristiyan Cholakov - AI & Software Engineer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kristiyan Cholakov | AI & Software Engineer',
    description:
      'Portfolio of Kristiyan Cholakov showcasing experience in AI, Data Science, and Full-Stack Development.',
    images: ['/preview.png'],
  },
  alternates: {
    canonical: 'https://kristiyancholakov.com',
    languages: {
      en: 'https://kristiyancholakov.com',
      bg: 'https://kristiyancholakov.com/bg',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Favicon and SEO Enhancers */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
