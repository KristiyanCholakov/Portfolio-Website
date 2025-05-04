'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  Code,
  CheckCircle,
  Clock,
  Terminal,
  Monitor,
  Server,
  Equal,
  Database,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import TypingText from '@/components/ui/TypingText'
import ScrollArrow from '@/components/ui/ScrollArrow'
import experienceData from '@/data/experience.json'

// Type definition for the experience data
type ExperienceItem = {
  id: string
  role: string
  company: string
  location: string
  period: string
  type: string
  description: string
  responsibilities: string[]
  technologies: string[]
  color: string
  icon: string
}

// Map icon strings to actual components
const iconMap = {
  Monitor,
  Code,
  Server,
  Equal,
  Database,
}

// Process experience data to include icon components
const experience = experienceData.map((item) => ({
  ...item,
  icon: iconMap[item.icon as keyof typeof iconMap],
}))

// Terminal animations
const typingCommands = [
  { content: '$ cd experience', delay: 0 },
  { content: '$ ls -la', delay: 1.0 },
  { content: 'total 4', delay: 1.5 },
  { content: 'drwxr-xr-x  5 user  staff  160 Jan 15 10:23 .', delay: 1.8 },
  { content: 'drwxr-xr-x 18 user  staff  576 Jan 15 10:22 ..', delay: 2.0 },
  {
    content: '-rw-r--r--  1 user  staff  724 Jan 15 10:23 job_history.json',
    delay: 2.2,
  },
  { content: '$ cat job_history.json | jq .', delay: 3.0 },
  {
    content:
      '{\n  "name": "Kristiyan Cholakov",\n  "title": "AI Developer & Engineer",\n  "experience": "5+ years",\n  "expertise": ["AI", "Web Dev", "Cloud", "Data Science"],\n  "jobs": [...]',
    delay: 3.5,
  },
  { content: '$ npm run start:career', delay: 5.0 },
  { content: '> Starting professional journey visualization...', delay: 5.5 },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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

export default function Experience() {
  const [activeJob, setActiveJob] = useState('job1')
  // Add state for the glowing dots
  const [glowingDots, setGlowingDots] = useState<
    Array<{
      id: number
      width: number
      height: number
      left: string
      top: string
      opacity: number
      duration: number
    }>
  >([])

  // Generate the random glowing dots only on the client side
  useEffect(() => {
    const newDots = Array(6)
      .fill(0)
      .map((_, i) => ({
        id: i,
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 70 + 10}%`,
        top: `${Math.random() * 70 + 10}%`,
        opacity: 0.07,
        duration: Math.random() * 5 + 5,
      }))

    setGlowingDots(newDots)
  }, [])

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Unique background - Terminal-inspired with glowing effect */}
      <div className="absolute inset-0 -z-10">
        {/* Dark gradient background with terminal look */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#171717] to-[#1a1a1a] opacity-90"></div>

        {/* Terminal window with animated typing */}
        <div className="absolute top-1/4 left-1/2 h-64 w-4/5 max-w-2xl -translate-x-1/2 -translate-y-1/4 opacity-20">
          {/* Terminal header */}
          <div className="flex h-6 items-center rounded-t-md bg-[#1a1a1a] px-2">
            <div className="mr-1.5 h-3 w-3 rounded-full bg-red-500"></div>
            <div className="mr-1.5 h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="ml-2 font-mono text-xs text-gray-400">terminal -- 80x24</div>
          </div>

          {/* Terminal content */}
          <div className="bg-opacity-70 text-accent/70 h-[calc(100%-1.5rem)] overflow-hidden rounded-b-md bg-black p-3 font-mono text-xs">
            {typingCommands.map((cmd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: cmd.delay, duration: 0.3 }}
                className="mb-1 whitespace-pre-wrap"
                style={{
                  textShadow: cmd.content.startsWith('$') ? '0 0 5px rgba(56,189,248,0.5)' : 'none',
                }}
              >
                {cmd.content}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: 6.5,
                duration: 1,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="bg-accent ml-0.5 inline-block h-4 w-2"
            ></motion.div>
          </div>
        </div>

        {/* Circuit board pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="circuit-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 50h100M50 0v100M25 25h25v25h25"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="25" cy="25" r="2" fill="white" />
                <circle cx="75" cy="25" r="2" fill="white" />
                <circle cx="75" cy="75" r="2" fill="white" />
                <circle cx="25" cy="75" r="2" fill="white" />
                <circle cx="50" cy="50" r="3" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Glowing accent dots - using client-side state instead of inline random values */}
        {glowingDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="bg-accent/70 absolute rounded-full blur-lg"
            style={{
              width: dot.width,
              height: dot.height,
              left: dot.left,
              top: dot.top,
              opacity: dot.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.07, 0.03],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header with terminal-inspired design */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="bg-surface/80 border-accent/10 inline-flex rounded-lg border p-1.5">
            <div className="bg-accent/10 flex items-center space-x-1 rounded px-3 py-1.5">
              <Terminal size={18} className="text-accent" />
              <h2 className="text-accent text-2xl font-bold sm:text-3xl">
                Professional Experience
              </h2>
            </div>
          </div>

          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-accent mx-auto my-4 h-1"
          />
          <p className="text-text-muted font-mono">
            <TypingText text="Career timeline and professional journey" delay={30} />
          </p>
        </motion.div>

        {/* Main content - Experience tabs with terminal-inspired design */}
        <div className="grid gap-8 lg:grid-cols-10">
          {/* Vertical job timeline */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-surface/60 border-accent/10 rounded-lg border backdrop-blur-md">
              <div className="border-accent/10 bg-surface/80 flex items-center space-x-2 rounded-t-lg border-b p-3">
                <div className="flex space-x-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-accent font-mono text-xs">jobs.sh</div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {experience.map((job, index) => (
                    <motion.button
                      key={job.id}
                      variants={itemVariants}
                      className={`flex w-full flex-col border-l-2 px-4 py-4 text-left ${
                        activeJob === job.id
                          ? 'border-accent bg-accent/5 text-accent font-medium'
                          : 'text-text-muted hover:border-accent/30 hover:bg-surface border-transparent'
                      }`}
                      style={{
                        borderColor: activeJob === job.id ? job.color : 'transparent',
                        borderLeftWidth: '3px',
                      }}
                      onClick={() => setActiveJob(job.id)}
                      // Prevent Framer Motion from interfering with our state changes
                      transition={{ type: 'tween', duration: 0 }}
                      animate={{}} // Empty animate prop to prevent default animations
                    >
                      {/* Job title and icon row */}
                      <div className="flex items-center">
                        <job.icon
                          size={20}
                          className={activeJob === job.id ? 'text-accent' : 'text-text-muted'}
                          style={{
                            color: activeJob === job.id ? job.color : undefined,
                          }}
                        />
                        <div className="ml-3 truncate font-medium">{job.role}</div>
                      </div>

                      {/* Company name row */}
                      <div className="mt-1.5 pl-7">
                        <div className="text-xs font-medium opacity-80">{job.company}</div>
                      </div>

                      {/* Period row */}
                      <div className="mt-2 pl-7">
                        <div
                          className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                            activeJob === job.id
                              ? 'bg-accent/10 text-accent'
                              : 'bg-surface/80 text-text-muted'
                          }`}
                        >
                          {job.period}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job details panel */}
          <motion.div
            className="overflow-hidden rounded-xl backdrop-blur-sm lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border-accent/10 relative h-full overflow-hidden rounded-xl border">
              <AnimatePresence>
                {experience.map(
                  (job) =>
                    activeJob === job.id && (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, position: 'absolute', inset: 0 }}
                        animate={{ opacity: 1, position: 'relative' }}
                        exit={{ opacity: 0, position: 'absolute', inset: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        {/* Blured background div */}
                        <div className="h-full overflow-hidden">
                          {/* Job header with colored accent */}
                          <div
                            className="px-6 py-5"
                            style={{
                              background: `linear-gradient(to right, ${job.color}10, transparent)`,
                              borderBottom: `1px solid ${job.color}30`,
                            }}
                          >
                            <div className="flex flex-wrap justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-text-primary text-xl font-bold">
                                    {job.role}
                                  </h3>
                                  <div
                                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                                    style={{
                                      backgroundColor: `${job.color}15`,
                                      color: job.color,
                                    }}
                                  >
                                    {job.type}
                                  </div>
                                </div>
                                <p className="text-accent flex items-center gap-1.5 text-lg font-medium">
                                  <Briefcase size={16} /> {job.company}
                                </p>
                              </div>

                              <div className="text-right">
                                <div className="text-text-muted flex items-center justify-end gap-1.5">
                                  <Clock size={14} className="text-accent" />
                                  <span>{job.period}</span>
                                </div>
                                <div className="text-text-muted mt-1 text-sm">{job.location}</div>
                              </div>
                            </div>
                          </div>

                          {/* Job content with terminal-inspired design */}
                          <div className="bg-surface/40 p-6">
                            <div className="border-accent/5 mb-6 rounded-lg border bg-black/40 p-4">
                              <p className="text-text-primary font-mono text-sm">
                                {job.description}
                              </p>
                            </div>

                            {/* Responsibilities */}
                            <div className="mb-6">
                              <h4 className="text-accent mb-3 font-mono text-sm font-semibold tracking-wider">
                                RESPONSIBILITIES
                              </h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((item, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                                    className="text-text-muted flex items-start gap-2 text-sm"
                                  >
                                    <CheckCircle
                                      size={16}
                                      className="mt-0.5 shrink-0"
                                      style={{ color: job.color }}
                                    />
                                    <span>{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="text-accent mb-3 font-mono text-sm font-semibold tracking-wider">
                                TECH STACK
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {job.technologies.map((tech, i) => (
                                  <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                                    className="border-accent/10 flex items-center gap-1.5 rounded-md border bg-black/20 px-3 py-1 text-sm"
                                  >
                                    <Code
                                      size={14}
                                      className="text-accent"
                                      style={{ color: job.color }}
                                    />
                                    {tech}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Job details */}
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Scroll arrow to Projects section */}
        <div className="mt-16 text-center">
          <ScrollArrow targetSection="projects" label="Explore my projects" />
        </div>
      </div>
    </section>
  )
}
