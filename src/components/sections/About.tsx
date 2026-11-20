'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Code,
  Terminal,
  Braces,
  Database,
  FileCode,
  GitBranch,
  Hash,
  Bot,
  ArrowRight,
} from 'lucide-react'
import { scrollToSection } from '@/utils/navigation'
import ScrollArrow from '@/components/ui/ScrollArrow'
import { useState, useEffect } from 'react'

const awards = [
  {
    date: 'Q3 2026',
    title: 'Best AI Implementation',
    detail: 'Experian recognised my reporting platform in the Individual Contribution category.',
  },
  { date: 'Q1 2026', title: 'Employee of the Quarter', detail: 'Experian' },
  {
    date: 'Sep 2025',
    title: 'Highly Commended',
    detail:
      'My handwritten exam platform placed in the top 10% of Computer Science submissions at the Global Undergraduate Awards.',
  },
  {
    date: 'AY 2024/25',
    title: 'Dean’s List',
    detail: 'NTU College of Computing and Data Science. Final-semester GPA of 5.00/5.00.',
  },
]

const mainTech = [
  'Python',
  'SQL',
  'C++',
  'Java',
  'JavaScript',
  'TypeScript',
  'PyTorch',
  'LightGBM',
  'PySpark',
  'Tableau',
]

// Decorative code icons for the background
const codeIcons = [
  { Icon: Code, top: '10%', left: '5%', size: 24, duration: 35, delay: 0 },
  { Icon: Braces, top: '25%', right: '7%', size: 28, duration: 40, delay: 2 },
  { Icon: Terminal, top: '40%', left: '12%', size: 20, duration: 30, delay: 1 },
  {
    Icon: FileCode,
    bottom: '30%',
    right: '15%',
    size: 22,
    duration: 38,
    delay: 0.5,
  },
  {
    Icon: Database,
    bottom: '20%',
    left: '7%',
    size: 18,
    duration: 42,
    delay: 1.5,
  },
  {
    Icon: GitBranch,
    top: '15%',
    right: '20%',
    size: 22,
    duration: 36,
    delay: 0.7,
  },
  {
    Icon: Hash,
    bottom: '40%',
    left: '20%',
    size: 26,
    duration: 33,
    delay: 2.2,
  },
  { Icon: Bot, top: '30%', left: '25%', size: 20, duration: 37, delay: 1.2 },
]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export default function About() {
  // Add state to track if content is ready to be shown
  const [isContentReady, setIsContentReady] = useState(false)

  // Use effect to set content as ready after a short delay
  useEffect(() => {
    // Small delay to ensure all elements are properly loaded
    const timer = setTimeout(() => {
      setIsContentReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Background elements - always visible but with controlled opacity */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.15), transparent 70%)',
          opacity: isContentReady ? 0.2 : 0,
        }}
      />

      {/* Decorative coding icons in background - controlled visibility */}
      <div
        className={`transition-opacity duration-700 ${isContentReady ? 'opacity-100' : 'opacity-0'}`}
      >
        {codeIcons.map(({ Icon, top, left, right, bottom, size, duration, delay }, index) => (
          <motion.div
            key={index}
            className="text-accent/10 absolute hidden lg:block"
            style={{ top, left, right, bottom }}
            animate={{ rotate: 360 }}
            initial={{ rotate: 0 }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay,
            }}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <motion.h2 className="text-accent mb-2 text-3xl font-bold sm:text-4xl">
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-accent mx-auto mb-4 h-1"
          />
        </motion.div>

        {/* Bio centered with the same max-width as the card grid */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-text-primary leading-relaxed">
              I’m a Senior Data Scientist in Experian’s Proactive Analytics team in Sofia. I lead
              the Bulgaria-based team members and build tools that help analysts explain trends in
              U.S. consumer credit. My reporting platform connects the figures in each report to the
              calculations behind them.
            </p>
            <p className="text-text-muted leading-relaxed">
              At Nanyang Technological University in Singapore, I studied computer science,
              specialising in AI and data science with a minor in mathematics. For my final year
              project, I built a system that reads handwritten STEM exams, from page layout to
              mathematical notation and grading.
            </p>

            {/* Main technologies tags */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-2 pt-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {mainTech.map((tech, i) => (
                <motion.span
                  key={tech}
                  variants={fadeInUp}
                  custom={i}
                  className="border-accent/30 bg-surface text-accent inline-block rounded-full border px-3 py-1 text-xs font-medium"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(56,189,248,0.2)',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Tech Stack Link */}
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href="#tech-stack"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('tech-stack')
                }}
                className="group inline-flex items-center"
              >
                <span className="text-text-muted group-hover:text-accent mr-2 text-sm transition-colors">
                  View my complete tech stack
                </span>
                <motion.div
                  className="text-accent relative"
                  whileHover={{ x: 5 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    x: {
                      duration: 1.8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    },
                    hover: { duration: 0.2 },
                  }}
                >
                  <ArrowRight size={18} />
                  {/* Animated glow behind the arrow */}
                  <motion.div
                    className="bg-accent/20 absolute -inset-1 -z-10 rounded-full blur-sm"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="mx-auto mb-16 max-w-3xl">
          <h3 className="text-accent mb-4 text-2xl font-bold">Honours and awards</h3>
          <ul className="divide-y divide-slate-700/60 border-y border-slate-700/60">
            {awards.map((award) => (
              <li key={award.title} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <span className="font-mono text-sm text-sky-300">{award.date}</span>
                <div>
                  <h4 className="font-semibold">{award.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{award.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-accent mt-8 mb-2 text-lg font-semibold">Certifications</h3>
          <p>
            Google IT Automation with Python, Google Business Intelligence and Google Project
            Management
          </p>
          <h3 className="text-accent mt-6 mb-2 text-lg font-semibold">Languages</h3>
          <p>Bulgarian (native) and English (full professional proficiency)</p>
        </div>

        {/* Scroll CTA */}
        <ScrollArrow targetSection="education" label="View my education" />
      </div>
    </section>
  )
}
