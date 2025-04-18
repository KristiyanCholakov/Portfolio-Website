'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronDown,
  Code,
  Terminal,
  Braces,
  Database,
  FileCode,
  GitBranch,
  Hash,
  Bot,
  ArrowRight,
  Cpu,
  Globe,
  BarChart,
} from 'lucide-react'
import TypingText from '@/components/ui/TypingText'
import { scrollToSection } from '@/utils/navigation'
import ScrollArrow from '@/components/ui/ScrollArrow'
import { useState, useEffect } from 'react'

// Highlights with icons
const highlights = [
  {
    icon: '🎓',
    title: 'Education',
    description: 'B.Eng. Computer Science, Nanyang Technological University (NTU), Singapore',
  },
  {
    icon: '🧠',
    title: 'Specialization',
    description: 'Artificial Intelligence and Data Science with Minor in Mathematics',
  },
  {
    icon: '💻',
    title: 'Skills',
    description: 'Machine Learning, Data Analysis, Software Development',
  },
]

// Main technologies
const mainTech = [
  'Python',
  'PyTorch',
  'TensorFlow',
  'Flask',
  'Django',
  'TypeScript',
  'Next.js',
  'Kotlin',
  'Java',
]

// Skills data for visualization
const skillCategories = [
  {
    name: 'Software Development',
    icon: Globe,
    skills: [
      { name: 'Full-Stack Web Development', level: 95 },
      { name: 'Mobile App Development', level: 95 },
      { name: 'Backend API Design & Integration', level: 90 },
      { name: 'Cross-Platform Applications', level: 85 },
    ],
  },
  {
    name: 'Machine Learning',
    icon: Cpu,
    skills: [
      { name: 'Deep Learning', level: 95 },
      { name: 'Computer Vision', level: 90 },
      { name: 'Natural Language Processing (NLP)', level: 90 },
      { name: 'Model Design & Deployment', level: 90 },
    ],
  },
  {
    name: 'Data Science',
    icon: BarChart,
    skills: [
      { name: 'Data Visualization', level: 95 },
      { name: 'Exploratory Data Analysis (EDA)', level: 95 },
      { name: 'Database & Data Design', level: 90 },
      { name: 'Statistical Modeling & Inference', level: 90 },
    ],
  },
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
          <p className="text-text-muted font-mono tracking-wider">
            <TypingText text="Curious | Creative | Coder" delay={50} />
          </p>
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
              As a recent graduate in Computer Science from Nanyang Technological University (NTU),
              Singapore, with a specialization in Artificial Intelligence (AI) and Data Science
              (DS), I am passionate about leveraging cutting-edge technologies to solve complex
              problems. My academic journey was enriched by a minor in Mathematics and a range of
              impactful projects that honed my technical expertise and analytical skills.
            </p>
            <p className="text-text-muted leading-relaxed">
              Over the past four years, I have cultivated a deep interest in Machine Learning (ML)
              and Data Science, focusing my studies and practical efforts on these fields. Beyond my
              technical pursuits, I am dedicated to teamwork, leadership, and innovation. I thrive
              in collaborative environments, identifying critical components of projects,
              efficiently delegating tasks, and integrating diverse technologies to deliver
              innovative solutions.
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

        {/* Interactive Skills Visualization - Replacing Image Section */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="border-accent/10 bg-surface/50 relative grid grid-cols-1 gap-6 rounded-xl border p-6 backdrop-blur-sm md:grid-cols-3">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                className="border-accent/10 relative overflow-hidden rounded-lg border p-5"
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 30px -15px rgba(56,189,248,0.3)',
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-accent/10 text-accent flex h-10 w-10 items-center justify-center rounded-full">
                    <category.icon size={20} />
                  </div>
                  <h3 className="text-accent text-lg font-bold">{category.name}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-text-primary text-sm">{skill.name}</span>
                        <span className="text-text-muted text-xs">{skill.level}%</span>
                      </div>
                      <div className="bg-accent/10 h-2 w-full overflow-hidden rounded-full">
                        <motion.div
                          className="bg-accent h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.4 + idx * 0.1 + i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative elements with controlled opacity */}
                <div
                  className="text-accent/5 absolute -right-4 -bottom-4 transition-opacity duration-700"
                  style={{ opacity: isContentReady ? 0.5 : 0 }}
                >
                  <category.icon size={80} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights/Key Facts */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="bg-surface border-accent/10 hover:shadow-accent/10 group rounded-lg border p-6 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="mb-3 text-3xl"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-accent mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-text-muted text-sm">{item.description}</p>

                {/* Subtle indicator line */}
                <motion.div
                  className="bg-accent mt-4 h-0.5 w-0"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll CTA */}
        <ScrollArrow targetSection="education" label="View my education" />
      </div>
    </section>
  )
}
