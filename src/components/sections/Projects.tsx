'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  ExternalLink,
  Filter,
  Github,
  SortAsc,
  SortDesc,
  Star,
  X,
  Layers,
  Cpu,
  Server,
  Grid,
  Box,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import TypingText from '@/components/ui/TypingText'
import projectsData from '@/data/projects.json'
import ScrollArrow from '@/components/ui/ScrollArrow'

// Types
interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  thumbnail: string
  technologies: string[]
  category: string
  featured: boolean
  github: string
  demo?: string
  completed: string
}

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

// New background elements - grid nodes with connections
const gridNodes = [
  { x: '10%', y: '15%', size: 6, pulseDelay: 0 },
  { x: '25%', y: '8%', size: 8, pulseDelay: 1.2 },
  { x: '40%', y: '20%', size: 5, pulseDelay: 0.5 },
  { x: '70%', y: '12%', size: 7, pulseDelay: 1.8 },
  { x: '85%', y: '22%', size: 6, pulseDelay: 0.8 },
  { x: '15%', y: '75%', size: 7, pulseDelay: 1.5 },
  { x: '38%', y: '88%', size: 5, pulseDelay: 0.2 },
  { x: '60%', y: '85%', size: 8, pulseDelay: 1.0 },
  { x: '85%', y: '70%', size: 6, pulseDelay: 0.7 },
]

// New project icons with different animation patterns
const projectIcons = [
  {
    Icon: Layers,
    left: '8%',
    top: '30%',
    size: 22,
    duration: 15,
    delay: 0,
    animationType: 'float',
  },
  {
    Icon: Cpu,
    right: '15%',
    top: '40%',
    size: 28,
    duration: 18,
    delay: 2,
    animationType: 'pulse',
  },
  {
    Icon: Server,
    left: '12%',
    bottom: '25%',
    size: 26,
    duration: 20,
    delay: 1,
    animationType: 'float',
  },
  {
    Icon: Grid,
    right: '10%',
    bottom: '35%',
    size: 24,
    duration: 17,
    delay: 3,
    animationType: 'pulse',
  },
  {
    Icon: Box,
    left: '45%',
    bottom: '15%',
    size: 30,
    duration: 25,
    delay: 2.5,
    animationType: 'float',
  },
]

const HexagonBackground = () => {
  // Client-side only state for glowing hexagons
  const [hexagons, setHexagons] = useState<any[]>([])

  // Generate hexagons only on the client side
  useEffect(() => {
    const rows = 12
    const cols = 20
    const generatedHexagons = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xOffset = row % 2 === 0 ? 0 : 2.5
        const shouldGlow = Math.random() < 0.1

        generatedHexagons.push({
          x: `${col * 5 + xOffset}%`,
          y: `${row * 4.5}%`,
          glow: shouldGlow,
          delay: Math.random() * 5,
        })
      }
    }

    setHexagons(generatedHexagons)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {hexagons.map((hex, i) => (
        <div
          key={`hex-${i}`}
          className="absolute"
          style={{
            left: hex.x,
            top: hex.y,
            width: '30px',
            height: '30px',
          }}
        >
          {/* Base hexagon shape */}
          <div
            className="border-accent/5 absolute inset-0 border"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />

          {/* Glowing overlay for selected hexagons */}
          {hex.glow && (
            <motion.div
              className="bg-accent absolute inset-0"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: hex.delay,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  // State for filtering and sorting
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeTech, setActiveTech] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isGridView, setIsGridView] = useState(true)

  // Extract unique categories and technologies
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projectsData.map((project: Project) => project.category))]
    return cats
  }, [])

  const technologies = useMemo(() => {
    const techs = new Set<string>()
    projectsData.forEach((project: Project) => {
      project.technologies.forEach(tech => techs.add(tech))
    })
    return ['All', ...Array.from(techs)]
  }, [])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projectsData] as Project[]

    // Apply category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(project => project.category === activeCategory)
    }

    // Apply tech filter
    if (activeTech !== 'All') {
      filtered = filtered.filter(project => project.technologies.includes(activeTech))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.completed)
      const dateB = new Date(b.completed)
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })

    return filtered
  }, [activeCategory, activeTech, sortOrder])

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* New Background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Different gradient pattern */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, rgba(56,189,248,0.07) 0%, rgba(232,121,249,0.07) 50%, rgba(56,189,248,0.07) 100%)',
          }}
        />

        {/* Hexagonal pattern overlay */}
        <HexagonBackground />

        {/* Grid nodes and connections */}
        {gridNodes.map((node, i) => (
          <div key={`node-${i}`} className="absolute" style={{ left: node.x, top: node.y }}>
            <motion.div
              className="bg-accent/30 absolute rounded-full"
              style={{
                height: node.size,
                width: node.size,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                boxShadow: [
                  '0 0 0 rgba(56,189,248,0)',
                  '0 0 10px rgba(56,189,248,0.5)',
                  '0 0 0 rgba(56,189,248,0)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: node.pulseDelay,
                ease: 'easeInOut',
              }}
            />
          </div>
        ))}

        {/* Connect some nodes with lines */}
        <svg className="absolute inset-0 h-full w-full">
          <motion.path
            d={`M ${parseInt(gridNodes[0].x)} ${parseInt(gridNodes[0].y)} 
                L ${parseInt(gridNodes[2].x)} ${parseInt(gridNodes[2].y)}
                L ${parseInt(gridNodes[3].x)} ${parseInt(gridNodes[3].y)}
                L ${parseInt(gridNodes[4].x)} ${parseInt(gridNodes[4].y)}`}
            stroke="rgba(56,189,248,0.1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
          <motion.path
            d={`M ${parseInt(gridNodes[5].x)} ${parseInt(gridNodes[5].y)} 
                L ${parseInt(gridNodes[6].x)} ${parseInt(gridNodes[6].y)}
                L ${parseInt(gridNodes[7].x)} ${parseInt(gridNodes[7].y)}
                L ${parseInt(gridNodes[8].x)} ${parseInt(gridNodes[8].y)}`}
            stroke="rgba(56,189,248,0.1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Decorative project icons */}
      {projectIcons.map(
        ({ Icon, left, right, top, bottom, size, duration, delay, animationType }, index) => (
          <motion.div
            key={index}
            className="text-accent/10 absolute hidden lg:block"
            style={{ top, left, right, bottom }}
            animate={
              animationType === 'float'
                ? {
                    y: ['-5px', '5px', '-5px'],
                    rotate: ['-3deg', '3deg', '-3deg'],
                  }
                : {
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <motion.h2 className="text-accent mb-2 text-3xl font-bold sm:text-4xl">
            My Projects
          </motion.h2>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-accent mx-auto mb-4 h-1"
          />
          <p className="text-text-muted font-mono tracking-wider">
            <TypingText text="Turning ideas into working solutions" delay={50} />
          </p>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface/60 border-accent/10 mb-8 rounded-lg border backdrop-blur-sm"
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap gap-4">
              {/* Category filters */}
              <div className="flex flex-col space-y-2">
                <label className="text-text-muted text-xs font-medium">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-3 py-1 text-xs transition-all ${
                        activeCategory === category
                          ? 'bg-accent border-accent text-white'
                          : 'border-accent/20 text-text-muted hover:border-accent/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology filters */}
              <div className="flex flex-col space-y-2">
                <label className="text-text-muted text-xs font-medium">Technology</label>
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 8).map(tech => (
                    <button
                      key={tech}
                      onClick={() => setActiveTech(tech)}
                      className={`rounded-full border px-3 py-1 text-xs transition-all ${
                        activeTech === tech
                          ? 'bg-accent border-accent text-white'
                          : 'border-accent/20 text-text-muted hover:border-accent/50'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                  {technologies.length > 8 && (
                    <div className="text-text-muted px-2 py-1 text-xs">
                      +{technologies.length - 8} more
                    </div>
                  )}
                </div>
              </div>

              {/* Sort order */}
              <div className="ml-auto flex items-end">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="border-accent/20 text-text-muted hover:text-accent hover:border-accent/50 flex items-center gap-1 rounded-md border px-3 py-1 text-xs transition-all"
                >
                  {sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />}
                  {sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
                </button>
              </div>
            </div>

            {/* Active filters display */}
            {(activeCategory !== 'All' || activeTech !== 'All') && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-text-muted text-xs">Active filters:</span>
                {activeCategory !== 'All' && (
                  <div className="bg-accent/10 text-accent flex items-center gap-1 rounded-full px-2 py-0.5 text-xs">
                    <Filter size={10} />
                    {activeCategory}
                    <button onClick={() => setActiveCategory('All')}>
                      <X size={10} />
                    </button>
                  </div>
                )}
                {activeTech !== 'All' && (
                  <div className="bg-accent/10 text-accent flex items-center gap-1 rounded-full px-2 py-0.5 text-xs">
                    <Code size={10} />
                    {activeTech}
                    <button onClick={() => setActiveTech('All')}>
                      <X size={10} />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setActiveCategory('All')
                    setActiveTech('All')
                  }}
                  className="text-text-muted hover:text-accent text-xs underline"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`projects-grid-${activeCategory}-${activeTech}-${sortOrder}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-surface/60 border-accent/10 mt-8 rounded-lg border p-10 text-center backdrop-blur-sm"
            >
              <div className="text-accent bg-accent/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Filter size={24} />
              </div>
              <h3 className="text-text-primary mb-2 text-lg font-medium">
                No projects match your filters
              </h3>
              <p className="text-text-muted mx-auto max-w-md">
                Try adjusting your filter criteria or browse all projects by clicking the Reset
                button.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveTech('All')
                }}
                className="text-accent mt-4 text-sm underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add ScrollArrow at the end */}
      <div className="mt-16 text-center">
        <ScrollArrow targetSection="tech-stack" label="Discover my tech stack" />
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{
        y: -8,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(56, 189, 248, 0.1)',
        transition: { duration: 0.2 },
      }}
      className="group relative overflow-hidden rounded-xl shadow-sm transition-all"
    >
      {/* Card inner container with gradient border */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Animated gradient border */}
        <div className="border-accent/10 from-accent/20 to-highlight/20 absolute -inset-[1px] rounded-xl bg-gradient-to-tr opacity-70 transition-all duration-300 group-hover:opacity-100" />

        {/* Project content */}
        <div className="bg-surface relative overflow-hidden rounded-xl">
          {/* Project image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={600}
              height={340}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Category badge */}
            <div className="bg-surface/80 text-accent absolute top-3 left-3 rounded-full px-2 py-1 text-xs backdrop-blur-sm">
              {project.category}
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="bg-accent absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs text-white">
                <Star size={10} className="fill-white" />
                Featured
              </div>
            )}
          </div>

          {/* Project details */}
          <div className="p-6">
            <h3 className="text-text-primary mb-2 text-xl font-bold">{project.title}</h3>
            <p className="text-text-muted mb-5 line-clamp-2 text-sm">{project.description}</p>

            {/* Tech stack */}
            <div className="mb-5 flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="border-accent/20 bg-accent/5 text-accent rounded-full border px-2 py-0.5 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action links */}
            <div className="flex items-center gap-3">
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent flex items-center gap-1 text-sm transition-colors"
              >
                <Github size={16} />
                <span>Code</span>
              </Link>

              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent flex items-center gap-1 text-sm transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </Link>
              )}

              {/* Animated indicator line */}
              <motion.div
                className="bg-accent ml-auto h-0.5 w-6"
                initial={{ width: 6 }}
                whileHover={{ width: 24 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <motion.div
        className="from-accent/5 absolute -inset-40 z-[1] bg-gradient-to-br to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ mixBlendMode: 'soft-light' }}
        animate={{
          transform: [
            'translate(-50%, -50%) scale(0.8)',
            'translate(-40%, -60%) scale(0.85)',
            'translate(-50%, -50%) scale(0.8)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}
