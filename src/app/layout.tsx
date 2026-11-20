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
    default: 'Kristiyan Cholakov | Senior Data Scientist',
    template: '%s | Kristiyan Cholakov',
  },
  description:
    'Kristiyan Cholakov is a Senior Data Scientist at Experian in Sofia. Explore his work in credit analytics, automated reporting and handwritten STEM exam recognition.',
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
    title: 'Kristiyan Cholakov | Senior Data Scientist',
    description:
      'Kristiyan Cholakov is a Senior Data Scientist at Experian in Sofia. Explore his work in credit analytics, automated reporting and handwritten STEM exam recognition.',
    url: 'https://kristiyancholakov.com',
    siteName: 'Kristiyan Cholakov Portfolio',
    images: [
      {
        url: '/preview.png',
        width: 1250,
        height: 670,
        alt: 'Kristiyan Cholakov - Senior Data Scientist Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kristiyan Cholakov | Senior Data Scientist',
    description:
      'Kristiyan Cholakov is a Senior Data Scientist at Experian in Sofia. Explore his work in credit analytics, automated reporting and handwritten STEM exam recognition.',
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
