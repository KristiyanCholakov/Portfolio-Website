'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  School,
  Code,
} from 'lucide-react'
import TypingText from '@/components/ui/TypingText'
import ScrollArrow from '@/components/ui/ScrollArrow'
import educationData from '@/data/education.json'

// Type definition for education data
type EducationItem = {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  distinction: boolean
  focus: string
  description: string
  achievements: string[]
  color: string
}

// Get the appropriate icon component based on education ID
const getEducationIcon = (id: string) => {
  switch (id) {
    case 'ntu':
      return GraduationCap
    case 'softuni':
      return Code
    case 'hs':
      return School
    default:
      return GraduationCap
  }
}

// Use imported education data
const education = educationData as EducationItem[]

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Animation for code editor lines
const codeLines = [
  { indent: 0, content: 'class Education {', delay: 0 },
  { indent: 1, content: 'constructor() {', delay: 0.2 },
  { indent: 2, content: 'this.degrees = [];', delay: 0.3 },
  { indent: 2, content: 'this.skills = new Set();', delay: 0.4 },
  { indent: 2, content: 'this.init();', delay: 0.5 },
  { indent: 1, content: '}', delay: 0.6 },
  { indent: 1, content: 'async init() {', delay: 0.7 },
  { indent: 2, content: 'await this.loadDegrees();', delay: 0.8 },
  { indent: 2, content: 'this.processSkills();', delay: 0.9 },
  { indent: 1, content: '}', delay: 1.0 },
  { indent: 1, content: 'render() {', delay: 1.1 },
  { indent: 2, content: '// Showcasing academic journey', delay: 1.2 },
  { indent: 2, content: 'return this.degrees.map(degree => (', delay: 1.3 },
  { indent: 3, content: '<Degree {...degree} />', delay: 1.4 },
  { indent: 2, content: '));', delay: 1.5 },
  { indent: 1, content: '}', delay: 1.6 },
  { indent: 0, content: '}', delay: 1.7 },
]

export default function Education() {
  const [activeId, setActiveId] = useState('ntu')

  return (
    <section
      id="education"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Unique background - Code editor with animated typing */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#171717] to-[#0f0f0f]" />

        {/* Animated code lines */}
        <div className="text-accent/70 absolute inset-0 overflow-hidden p-8 font-mono text-xs sm:text-sm">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ delay: line.delay, duration: 0.5 }}
              className="whitespace-nowrap"
              style={{ paddingLeft: `${line.indent * 20}px` }}
            >
              {line.content}
            </motion.div>
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56,189,248,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56,189,248,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header with IDE-style tabs */}
        <div className="mb-12 text-center">
          <div className="bg-surface/80 border-accent/10 inline-flex items-center rounded-t-lg border border-b-0 px-4 py-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-accent font-mono text-xs font-medium"
            >
              <span className="mr-2 opacity-50">~/portfolio/</span>
              <span>education.tsx</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface/60 border-accent/10 rounded-lg rounded-tl-none border backdrop-blur-md"
          >
            <div className="px-6 pt-8 pb-6">
              <motion.h2 className="text-accent mb-2 flex items-center justify-center text-3xl font-bold sm:text-4xl">
                <GraduationCap className="mr-3" size={28} />
                Education
              </motion.h2>
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '100px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="bg-accent mx-auto mb-4 h-1"
              />
              <p className="text-text-muted font-mono tracking-wider">
                <TypingText text="Academic credentials and qualifications" delay={30} />
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content split into timeline and details */}
        <div className="grid gap-8 md:grid-cols-12">
          {/* Timeline navigation - Styled as a sidebar */}
          <motion.div
            className="bg-surface/60 border-accent/10 rounded-lg border p-4 backdrop-blur-sm md:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-text-primary mb-4 flex items-center font-mono text-sm font-medium">
              <Calendar size={16} className="text-accent mr-2" />
              TIMELINE
            </h3>

            <div className="relative space-y-2">
              {education.map((edu, index) => {
                const IconComponent = getEducationIcon(edu.id)
                return (
                  <div key={edu.id} className="relative">
                    <button
                      onClick={() => setActiveId(edu.id)}
                      className={`relative z-10 flex w-full items-start rounded-md p-3 text-left transition-colors ${
                        activeId === edu.id
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-muted hover:bg-surface/80 hover:text-text-primary'
                      }`}
                    >
                      <div
                        className={`mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          activeId === edu.id
                            ? 'bg-accent text-white'
                            : 'border-accent/20 text-text-muted border'
                        }`}
                      >
                        <IconComponent size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium break-words">{edu.degree}</div>
                        <div className="text-xs opacity-70">{edu.period}</div>
                      </div>
                    </button>

                    {/* Connect timeline items with vertical line */}
                    {index < education.length - 1 && (
                      <div
                        className="bg-accent/20 absolute top-10 left-5 ml-[-1px] h-[calc(100%-15px)] w-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Education card details */}
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="border-accent/10 relative h-full overflow-hidden rounded-xl border">
              <AnimatePresence>
                {education.map((edu) => {
                  const IconComponent = getEducationIcon(edu.id)
                  return (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, position: 'absolute', inset: 0 }}
                      animate={{
                        opacity: activeId === edu.id ? 1 : 0,
                        position: activeId === edu.id ? 'relative' : 'absolute',
                        display: activeId === edu.id ? 'block' : 'none',
                      }}
                      exit={{ opacity: 0, position: 'absolute', inset: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      {/* Top colored bar */}
                      <div className="h-2 w-full" style={{ backgroundColor: edu.color }} />

                      <div className="bg-surface/80 p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <IconComponent className="text-accent mt-1" size={20} />
                            <div>
                              <h3 className="text-text-primary text-xl font-bold">{edu.degree}</h3>
                              <p className="text-text-muted text-sm">{edu.focus}</p>
                            </div>
                          </div>
                          {edu.distinction && (
                            <div className="bg-accent/10 text-accent flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                              <Award size={14} />
                              Distinction
                            </div>
                          )}
                        </div>

                        <div className="mb-5 flex flex-wrap gap-4 text-sm">
                          <div className="text-text-muted flex items-center">
                            <BookOpen size={16} className="text-accent mr-1" />
                            {edu.institution}
                          </div>
                          <div className="text-text-muted flex items-center">
                            <MapPin size={16} className="text-accent mr-1" />
                            {edu.location}
                          </div>
                          <div className="text-text-muted flex items-center">
                            <Calendar size={16} className="text-accent mr-1" />
                            {edu.period}
                          </div>
                        </div>

                        <p className="text-text-primary mb-5">{edu.description}</p>

                        {/* Key achievements with animated bullets */}
                        <div>
                          <h4 className="text-accent mb-3 flex items-center text-sm font-semibold">
                            <Lightbulb size={16} className="mr-2" />
                            KEY ACHIEVEMENTS
                          </h4>
                          <motion.ul
                            variants={staggerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-2 text-sm"
                          >
                            {edu.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                variants={itemVariants}
                                className="text-text-muted border-accent/10 bg-surface/40 relative rounded-md border py-2 pr-4 pl-8"
                              >
                                <span className="bg-accent absolute top-1/2 left-3 h-2 w-2 -translate-y-1/2 rounded-full" />
                                {achievement}
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Scroll arrow to Experience section */}
        <div className="mt-16 text-center">
          <ScrollArrow targetSection="experience" label="View my professional experience" />
        </div>
      </div>
    </section>
  )
}
