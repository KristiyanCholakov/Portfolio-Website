'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import TypingText from '@/components/ui/TypingText'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
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

  return (
    <header className="border-border bg-background/95 relative w-full border-b font-mono shadow-md shadow-black/10 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="text-accent flex items-center text-lg font-bold tracking-tight whitespace-nowrap sm:text-xl"
          >
            <TypingText text={fullName} className="text-accent ml-1" />
          </Link>

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
                  className="border-accent bg-surface text-accent hover:bg-accent ml-2 border transition-colors duration-300 hover:!text-red-50"
                >
                  Resume
                </a>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="px-4 pt-2 pb-4 font-mono md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
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
                    onClick={() => setMobileMenuOpen(false)}
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
                    className="border-accent bg-surface text-accent hover:bg-accent mt-2 w-full border transition-colors duration-300"
                  >
                    Resume
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
