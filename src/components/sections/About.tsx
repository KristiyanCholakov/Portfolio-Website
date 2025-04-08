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

// Highlights with icons
const highlights = [
  {
    icon: '🎓',
    title: 'Education',
    description: 'MSc Computer Science with Distinction, Nottingham Trent University',
  },
  {
    icon: '🧠',
    title: 'Specialization',
    description: 'Artificial Intelligence and Data Science',
  },
  {
    icon: '💻',
    title: 'Skills',
    description: 'Web Development, Machine Learning, Computer Vision',
  },
]

// Main technologies
const mainTech = ['Python', 'TypeScript', 'React', 'Next.js', 'TensorFlow']

// Skills data for visualization
const skillCategories = [
  {
    name: 'Web Development',
    icon: Globe,
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'CSS/Tailwind', level: 85 },
    ],
  },
  {
    name: 'Machine Learning',
    icon: Cpu,
    skills: [
      { name: 'TensorFlow', level: 75 },
      { name: 'Computer Vision', level: 80 },
      { name: 'NLP', level: 70 },
    ],
  },
  {
    name: 'Data Science',
    icon: BarChart,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Data Visualization', level: 85 },
      { name: 'Statistical Analysis', level: 80 },
    ],
  },
]

// Decorative code icons for the background
const codeIcons = [
  { Icon: Code, top: '10%', left: '5%', size: 24, duration: 35, delay: 0 },
  { Icon: Braces, top: '25%', right: '7%', size: 28, duration: 40, delay: 2 },
  { Icon: Terminal, top: '40%', left: '12%', size: 20, duration: 30, delay: 1 },
  { Icon: FileCode, bottom: '30%', right: '15%', size: 22, duration: 38, delay: 0.5 },
  { Icon: Database, bottom: '20%', left: '7%', size: 18, duration: 42, delay: 1.5 },
  { Icon: GitBranch, top: '15%', right: '20%', size: 22, duration: 36, delay: 0.7 },
  { Icon: Hash, bottom: '40%', left: '20%', size: 26, duration: 33, delay: 2.2 },
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
  return (
    <section id="about" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
              I&#39;m a Computer Science graduate with a specialization in Artificial Intelligence
              and Data Science. My academic journey has equipped me with a strong foundation in both
              theoretical concepts and practical applications of cutting-edge technologies.
            </p>
            <p className="text-text-muted leading-relaxed">
              My passion lies in developing innovative solutions that combine web technologies with
              AI capabilities. I enjoy working with Python for data science and machine learning
              tasks, while leveraging React and Next.js for building sophisticated user interfaces.
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
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(56,189,248,0.2)' }}
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
                onClick={e => {
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
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
          <div className="from-accent/10 absolute -inset-10 bg-gradient-to-b to-transparent opacity-30 blur-3xl" />

          <div className="border-accent/10 bg-surface/50 relative grid grid-cols-1 gap-6 rounded-xl border p-6 backdrop-blur-sm md:grid-cols-3">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                className="border-accent/10 relative overflow-hidden rounded-lg border p-5"
                whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(56,189,248,0.3)' }}
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

                {/* Decorative elements */}
                <div className="text-accent/5 absolute -right-4 -bottom-4 opacity-50">
                  <category.icon size={80} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights/Key Facts */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={fadeInUp}
              className="bg-surface border-accent/10 hover:shadow-accent/10 group rounded-lg border p-6 shadow-lg transition-all duration-300"
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
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-text-muted mb-2 text-sm">Explore my projects</p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
            className="text-accent inline-block"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
