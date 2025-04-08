'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import TypingText from '@/components/ui/TypingText'
import { scrollToSection } from '@/utils/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://github.com/KristiyanCholakov', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/kristiyan-cholakov', icon: Linkedin, label: 'LinkedIn' },
]

const linkVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const fullName = 'Kristiyan Cholakov'

  // Function to handle smooth scrolling
  const handleScrollToSection = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(href.substring(1), 80, () => setMobileMenuOpen(false))
    } else if (href === '/' && window.location.pathname === '/') {
      e.preventDefault()
      scrollToSection('top', 0, () => setMobileMenuOpen(false))
    }
  }

  return (
    <header className="border-border bg-background/95 relative w-full border-b font-mono shadow-md shadow-black/10 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand with Social Media Icons */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-accent flex items-center text-lg font-bold tracking-tight whitespace-nowrap sm:text-xl"
            >
              <TypingText text={fullName} className="text-accent ml-1" />
            </Link>

            {/* Vertical Separator */}
            <div className="border-text-muted/30 mx-3 h-6 border-l"></div>

            {/* Social Media Icons next to name */}
            <div className="flex items-center space-x-2">
              {socialLinks.map(({ href, icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: -5 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: (fullName.length * 75) / 1000 + i * 0.1,
                        duration: 0.3,
                        ease: 'easeOut',
                      },
                    },
                  }}
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-text-muted hover:text-accent transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center space-x-6 md:flex">
            {navItems.map(({ href, label }, i) => (
              <motion.div
                key={href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
              >
                <Link
                  href={href}
                  onClick={handleScrollToSection(href)}
                  className="group text-text-muted hover:text-accent relative text-sm font-medium transition-colors"
                >
                  {label}
                  <span className="bg-accent absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: navItems.length * 0.1,
                duration: 0.3,
                ease: 'easeOut',
              }}
            >
              <Button asChild size="sm">
                <a
                  href="/Kristiyan_Cholakov_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-accent bg-surface text-accent hover:bg-accent ml-2 border transition-colors duration-300 hover:!text-white"
                >
                  Resume
                </a>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Toggle with Animation */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
          >
            <Button
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-muted hover:text-accent transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu with smooth slide transition */}
      <div className="overflow-hidden md:hidden">
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="px-4 pt-2 pb-4 font-mono"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                height: {
                  duration: 0.4,
                },
              }}
            >
              <nav className="space-y-3">
                {navItems.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                  >
                    <Link
                      href={href}
                      onClick={handleScrollToSection(href)}
                      className="text-text-muted hover:text-accent block text-sm font-medium transition-colors"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navItems.length * 0.1,
                    duration: 0.3,
                  }}
                >
                  <Button asChild size="sm">
                    <a
                      href="/Kristiyan_Cholakov_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-accent bg-surface text-accent hover:bg-accent mt-2 w-full border transition-colors duration-300 hover:!text-white"
                    >
                      Resume
                    </a>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
