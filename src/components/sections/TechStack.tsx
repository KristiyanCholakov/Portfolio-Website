'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import TypingText from '@/components/ui/TypingText'
import {
  Code,
  Database,
  Cpu,
  Globe,
  Server,
  BarChart,
  Cloud,
  RefreshCw,
  LucideIcon,
} from 'lucide-react'
import techStackData from '@/data/tech-stack.json'

// Type definitions
interface Technology {
  name: string
  logo: string
  level: number
}

interface TechCategory {
  name: string
  icon: LucideIcon
  color: string
  position: [number, number, number]
  technologies: Technology[]
}

interface CodeIcon {
  Icon: LucideIcon
  top?: string
  left?: string
  right?: string
  bottom?: string
  size: number
  duration: number
  delay: number
}

// Map icon strings from JSON to actual components
const iconMap: Record<string, LucideIcon> = {
  Globe,
  Server,
  BarChart,
  Cpu,
  Database,
  Cloud,
}

// Process tech categories from JSON with proper type casting for position
const techCategories: TechCategory[] = techStackData.map(category => ({
  ...category,
  icon: iconMap[category.icon as keyof typeof iconMap],
  position: (category.position as number[]).slice(0, 3) as [number, number, number],
}))

// Background decorative elements
const codeIcons: CodeIcon[] = [
  { Icon: Code, top: '10%', left: '5%', size: 24, duration: 35, delay: 0 },
  { Icon: Database, top: '25%', right: '7%', size: 28, duration: 40, delay: 2 },
  { Icon: Cpu, top: '40%', left: '12%', size: 20, duration: 30, delay: 1 },
  { Icon: Globe, bottom: '30%', right: '15%', size: 22, duration: 38, delay: 0.5 },
  { Icon: Server, bottom: '20%', left: '7%', size: 18, duration: 42, delay: 1.5 },
  { Icon: BarChart, top: '15%', right: '20%', size: 22, duration: 36, delay: 0.7 },
]

// TechNode component for 2D visualization
const TechNode = ({
  tech,
  category,
  hover,
  setHover,
}: {
  tech: Technology
  category: TechCategory
  hover: string | null
  setHover: (name: string | null) => void
}) => {
  const isHovered = hover === tech.name

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: isHovered ? 1.05 : 1,
        opacity: 1,
        y: isHovered ? -5 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.2,
      }}
      onHoverStart={() => setHover(tech.name)}
      onHoverEnd={() => setHover(null)}
    >
      <div
        className={`bg-surface/80 border-accent/20 border ${
          isHovered ? 'shadow-accent/20 shadow-lg' : ''
        } flex h-44 w-32 flex-col items-center rounded-lg p-3 transition-all duration-300`}
        style={{ borderTop: isHovered ? '3px solid #38bdf8' : '1px solid rgba(56,189,248,0.2)' }}
      >
        {/* Logo section - rectangular container */}
        <div className="bg-surface/50 my-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg">
          <Image
            src={tech.logo}
            alt={tech.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>

        {/* Name section */}
        <div
          className={`mt-2 mb-auto font-medium ${isHovered ? 'text-accent' : 'text-text-primary'}`}
        >
          {tech.name}
        </div>

        {/* Level indicator */}
        <div className="mt-2 w-full">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-text-muted text-xs">Proficiency</span>
            <span className="text-accent text-xs font-medium">{tech.level}%</span>
          </div>
          <div className="bg-surface/60 h-1.5 w-full overflow-hidden rounded-full">
            <div className="bg-accent h-full rounded-full" style={{ width: `${tech.level}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Category cluster component
const CategoryCluster = ({
  category,
  hover,
  setHover,
}: {
  category: TechCategory
  hover: string | null
  setHover: (name: string | null) => void
}) => {
  return (
    <motion.div
      className="mb-10 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-accent mb-6 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white">
        <category.icon size={18} />
        {category.name}
      </div>

      {/* Centered tech nodes with flex */}
      <div className="flex flex-wrap justify-center gap-5">
        {category.technologies.map(tech => (
          <TechNode
            key={tech.name}
            tech={tech}
            category={category}
            hover={hover}
            setHover={setHover}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Network visualization component
const TechNetwork = () => {
  const [hover, setHover] = useState<string | null>(null)
  const networkRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter categories based on active selection
  const displayedCategories = activeCategory
    ? techCategories.filter(cat => cat.name === activeCategory)
    : techCategories

  return (
    <div className="relative" ref={networkRef}>
      {/* Category filter buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
            activeCategory === null
              ? 'bg-accent text-white'
              : 'bg-surface/60 text-accent hover:bg-surface'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>

        {techCategories.map(category => (
          <button
            key={category.name}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
              activeCategory === category.name
                ? 'bg-accent text-white'
                : 'bg-surface/60 text-accent hover:bg-surface'
            }`}
            onClick={() =>
              setActiveCategory(activeCategory === category.name ? null : category.name)
            }
          >
            <category.icon size={14} />
            {category.name}
          </button>
        ))}
      </div>

      {/* Network visualization */}
      <div className="bg-surface/20 border-accent/10 rounded-xl border p-6 backdrop-blur-sm">
        <div className="space-y-12">
          {displayedCategories.map(category => (
            <CategoryCluster
              key={category.name}
              category={category}
              hover={hover}
              setHover={setHover}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.15), transparent 70%)',
        }}
      />

      {/* Decorative coding icons in background */}
      {codeIcons.map(({ Icon, top, left, right, bottom, size, duration, delay }, index) => (
        <motion.div
          key={index}
          className="text-accent/10 absolute hidden lg:block"
          style={{ top, left, right, bottom }}
          animate={{
            y: ['-5px', '5px', '-5px'],
            rotate: ['-3deg', '3deg', '-3deg'],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

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
            Tech Stack
          </motion.h2>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-accent mx-auto mb-4 h-1"
          />
          <p className="text-text-muted font-mono tracking-wider">
            <TypingText text="Tools and technologies I work with" delay={50} />
          </p>
        </motion.div>

        {/* Brief introduction - removed filtering/hovering explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface/60 border-accent/10 mb-10 rounded-lg border p-6 text-center backdrop-blur-sm md:px-10"
        >
          <p className="text-text-primary">
            My technology ecosystem spans multiple domains - from web development to artificial
            intelligence. Below is a visualization of the technologies I work with regularly.
          </p>
        </motion.div>

        {/* 2D Network Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TechNetwork />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
        >
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="bg-surface/60 border-accent/10 flex items-center gap-2 rounded-lg border p-3 backdrop-blur-sm"
              style={{ borderLeftColor: '#38bdf8', borderLeftWidth: '3px' }}
            >
              <div className="text-accent flex h-8 w-8 items-center justify-center">
                <category.icon size={20} />
              </div>
              <div>
                <h3 className="text-text-primary text-sm font-medium">{category.name}</h3>
                <p className="text-text-muted text-xs">
                  {category.technologies.length} technologies
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
