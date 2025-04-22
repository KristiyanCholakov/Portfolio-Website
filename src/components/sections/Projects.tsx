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
  Search,
  ChevronDown,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import TypingText from '@/components/ui/TypingText'
import projectsData from '@/data/projects.json'
import techStackData from '@/data/tech-stack.json'
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

interface Technology {
  name: string
  logo: string
  level: number
}

interface TechCategory {
  name: string
  icon: string
  color: string
  position: number[]
  technologies: Technology[]
}

// Inline FilterBar Component
interface FilterBarProps {
  categories: string[]
  techCategories: TechCategory[]
  activeCategory: string
  setActiveCategory: (cat: string) => void
  activeTechs: string[]
  setActiveTechs: (techs: string[]) => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (order: 'asc' | 'desc') => void
}

const FilterBar = ({
  categories,
  techCategories,
  activeCategory,
  setActiveCategory,
  activeTechs,
  setActiveTechs,
  sortOrder,
  setSortOrder,
}: FilterBarProps) => {
  // Search input for technologies
  const [techSearchQuery, setTechSearchQuery] = useState('')
  // Track which category-group panels are open
  const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>(
    techCategories.reduce((acc, grp) => ({ ...acc, [grp.name]: false }), {})
  )

  // Filter each category's tech list by the search query
  const filteredCategories = useMemo(() => {
    return techCategories
      .map((grp) => {
        const filteredNames = grp.technologies
          .map((t) => t.name)
          .filter((name) => name.toLowerCase().includes(techSearchQuery.toLowerCase()))
        return { ...grp, technologies: filteredNames }
      })
      .filter((grp) => grp.technologies.length > 0)
  }, [techCategories, techSearchQuery])

  return (
    <div className="bg-card/60 border-border mb-8 rounded-lg border backdrop-blur-sm">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          {/* Top row: Category filters and Sort order */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category filters */}
            <div className="flex flex-col space-y-2">
              <label className="text-muted-foreground text-xs font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-3 py-1 text-xs transition-all ${
                      activeCategory === cat
                        ? 'bg-accent border-accent text-accent-foreground'
                        : 'border-border text-muted-foreground hover:border-accent/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort order (moved to top row) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="border-border text-muted-foreground hover:border-accent bg-background/5 flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium transition"
              >
                {sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />}
                {sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
              </button>

              {/* Reset filters */}
              {(activeCategory !== 'All' || activeTechs.length > 0) && (
                <button
                  onClick={() => {
                    setActiveCategory('All')
                    setActiveTechs([])
                  }}
                  className="text-muted-foreground hover:text-accent text-xs underline"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Bottom row: Technology groups - no scroll */}
          <div className="flex w-full flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-muted-foreground text-xs font-medium">Technologies</label>
              <input
                type="text"
                placeholder="Search technologies..."
                value={techSearchQuery}
                onChange={(e) => setTechSearchQuery(e.target.value)}
                className="border-border placeholder:text-muted-foreground/30 bg-background/5 ml-auto w-48 rounded border px-3 py-1 text-xs outline-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {filteredCategories.map((grp) => (
                <div key={grp.name} className="flex flex-col">
                  <button
                    onClick={() =>
                      setGroupOpen({
                        ...groupOpen,
                        [grp.name]: !groupOpen[grp.name],
                      })
                    }
                    className="bg-secondary hover:bg-secondary/70 flex w-full items-center justify-between rounded px-3 py-1 text-xs font-medium transition"
                  >
                    <span>{grp.name}</span>
                    <motion.div
                      animate={{ rotate: groupOpen[grp.name] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={12} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {groupOpen[grp.name] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap gap-2 px-2 py-1"
                      >
                        {grp.technologies.map((tech) => (
                          <button
                            key={tech}
                            onClick={() => {
                              const selected = activeTechs.includes(tech)
                                ? activeTechs.filter((t) => t !== tech)
                                : [...activeTechs, tech]
                              setActiveTechs(selected)
                            }}
                            className={`rounded-full border px-3 py-1 text-xs transition-all ${
                              activeTechs.includes(tech)
                                ? 'bg-accent border-accent text-accent-foreground'
                                : 'border-border text-muted-foreground hover:border-accent/50'
                            }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(activeCategory !== 'All' || activeTechs.length > 0) && (
            <div className="border-border mt-4 border-t pt-4">
              <div className="flex items-center">
                <span className="text-muted-foreground text-xs font-medium">Active Filters:</span>
                <div className="ml-2 flex flex-wrap gap-2">
                  {activeCategory !== 'All' && (
                    <div className="bg-accent/10 text-accent flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                      <span>Category: {activeCategory}</span>
                      <button
                        onClick={() => setActiveCategory('All')}
                        className="hover:bg-accent/20 ml-1 rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  {activeTechs.map((tech) => (
                    <div
                      key={tech}
                      className="bg-accent/10 text-accent flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                    >
                      <span>{tech}</span>
                      <button
                        onClick={() => setActiveTechs(activeTechs.filter((t) => t !== tech))}
                        className="hover:bg-accent/20 ml-1 rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: 'easeOut' },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

// Background elements (unchanged)
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
  const [hexagons, setHexagons] = useState<any[]>([])
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

// Project Modal component for displaying project details
interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  // If no project or not open, don't render anything
  if (!project || !isOpen) return null

  // Function to ensure correct image path from public directory
  const getImagePath = (path: string) => {
    // If path already starts with a slash or http, return it as is
    if (path.startsWith('/') || path.startsWith('http')) {
      return path
    }

    // If path starts with './projects/' or 'projects/', normalize it
    if (path.startsWith('./projects/')) {
      return `/projects/${path.substring(11)}`
    }
    if (path.startsWith('projects/')) {
      return `/projects/${path.substring(9)}`
    }

    // Default case, assume it's directly in the projects folder
    return `/projects/${path}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -40,
              transition: {
                duration: 0.4,
                ease: 'easeInOut',
              },
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="border-border bg-card fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl border shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-accent absolute top-4 right-4 z-10 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col">
              {/* Modal header with image */}
              <div className="relative h-64 w-full sm:h-80">
                <Image
                  src={getImagePath(project.thumbnail)}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />

                {/* Category badge */}
                <div className="text-accent bg-card/80 absolute top-4 left-4 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                  {project.category}
                </div>

                {/* Featured badge - adjusted position */}
                {project.featured && (
                  <div className="bg-accent text-accent-foreground absolute top-14 left-4 flex items-center gap-1 rounded-full px-3 py-1 text-sm">
                    <Star size={14} className="fill-current" />
                    Featured
                  </div>
                )}

                {/* Title */}
                <h3 className="text-foreground absolute right-6 bottom-6 left-6 text-3xl font-bold">
                  {project.title}
                </h3>
              </div>

              {/* Modal content */}
              <div className="p-6 sm:p-8">
                {/* Technologies */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border-accent/20 bg-accent/5 text-accent rounded-full border px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-foreground mb-3 text-xl font-semibold">About this project</h4>
                  {project.longDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent hover:bg-accent/80 text-accent-foreground flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium transition-colors"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-accent text-accent hover:bg-accent/10 flex items-center gap-2 rounded-md border px-5 py-2 text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={18} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  // State for filtering and sorting
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeTechs, setActiveTechs] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isGridView, setIsGridView] = useState(true)

  // State for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to open the modal with a specific project
  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  // Function to close the modal
  const closeProjectModal = () => {
    setIsModalOpen(false)
    // Re-enable body scrolling
    document.body.style.overflow = 'auto'
  }

  const categories = ['All', 'Artificial Intelligence', 'Data Science', 'Software Development']

  // Projects filter logic
  const filteredProjects = useMemo(() => {
    let list = [...projectsData]
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory)
    }
    if (activeTechs.length > 0) {
      list = list.filter((p) => p.technologies.some((t) => activeTechs.includes(t)))
    }
    list.sort((a, b) => {
      const diff = new Date(a.completed).getTime() - new Date(b.completed).getTime()
      return sortOrder === 'asc' ? diff : -diff
    })
    return list
  }, [activeCategory, activeTechs, sortOrder])

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Background & icons (unchanged) */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, rgba(56,189,248,0.07) 0%, rgba(232,121,249,0.07) 50%, rgba(56,189,248,0.07) 100%)',
          }}
        />
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
        {/* Header (unchanged) */}
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
          <p className="text-muted-foreground font-mono tracking-wider">
            <TypingText text="Turning ideas into working solutions" delay={50} />
          </p>
        </motion.div>

        {/* Updated Filter Bar */}
        <FilterBar
          categories={categories}
          techCategories={techStackData}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeTechs={activeTechs}
          setActiveTechs={setActiveTechs}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`projects-grid-${activeCategory}-${activeTechs.join(',')}-${sortOrder}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => openProjectModal(project)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card/60 border-border mt-8 rounded-lg border p-10 text-center backdrop-blur-sm"
            >
              <div className="text-accent bg-accent/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Filter size={24} />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-medium">
                No projects match your filters
              </h3>
              <p className="text-muted-foreground mx-auto max-w-md">
                Try adjusting your filter criteria or reset all filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All')
                  setActiveTechs([])
                }}
                className="text-accent mt-4 text-sm underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Arrow */}
      <div className="mt-16 text-center">
        <ScrollArrow targetSection="tech-stack" label="Discover my tech stack" />
      </div>

      {/* Project detail modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
    </section>
  )
}

// ProjectCard with fixed dimensions
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  // Function to ensure correct image path from public directory
  const getImagePath = (path: string) => {
    // If path already starts with a slash or http, return it as is
    if (path.startsWith('/') || path.startsWith('http')) {
      return path
    }

    // If path starts with './projects/' or 'projects/', normalize it
    if (path.startsWith('./projects/')) {
      return `/projects/${path.substring(11)}`
    }
    if (path.startsWith('projects/')) {
      return `/projects/${path.substring(9)}`
    }

    // Default case, assume it's directly in the projects folder
    return `/projects/${path}`
  }

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{
        y: -8,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(56, 189, 248, 0.1)',
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
      className="group relative h-[460px] cursor-pointer overflow-hidden rounded-xl shadow-sm transition-all"
    >
      {/* Card inner container with gradient border */}
      <div className="relative h-full overflow-hidden rounded-xl">
        {/* Animated gradient border */}
        <div className="border-accent/10 from-accent/20 to-primary/20 absolute -inset-[1px] rounded-xl bg-gradient-to-tr opacity-70 transition-all duration-300 group-hover:opacity-100" />

        {/* Project content */}
        <div className="bg-card relative flex h-full flex-col overflow-hidden rounded-xl">
          {/* Project image - Fixed height */}
          <div className="relative h-[200px] w-full overflow-hidden">
            <Image
              src={getImagePath(project.thumbnail)}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Category badge */}
            <div className="bg-card/80 text-accent absolute top-3 left-3 rounded-full px-2 py-1 text-xs backdrop-blur-sm">
              {project.category}
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="bg-accent text-accent-foreground absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs">
                <Star size={10} className="fill-current" />
                Featured
              </div>
            )}
          </div>

          {/* Project details - Flex grow to fill remaining space */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="text-foreground mb-2 line-clamp-2 text-xl font-bold">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-5 line-clamp-2 text-sm">
                {project.description}
              </p>

              {/* Tech stack with overflow handling */}
              <div className="mb-5 flex max-h-[60px] flex-wrap gap-2 overflow-hidden">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border-accent/20 bg-accent/5 text-accent mb-1 rounded-full border px-2 py-0.5 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent flex items-center gap-1 text-sm transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
                <span>Code</span>
              </Link>

              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent flex items-center gap-1 text-sm transition-colors"
                  onClick={(e) => e.stopPropagation()}
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

      {/* Decorative background elements that extend to full card */}
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
