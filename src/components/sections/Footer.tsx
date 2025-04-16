'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Mail } from 'lucide-react'
import { scrollToSection } from '@/utils/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/KristiyanCholakov',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/kristiyan-cholakov',
    },
    { name: 'Email', icon: Mail, href: 'mailto:krischolakov@icloud.com' },
  ]

  const navLinks = [
    { name: 'Home', sectionId: 'top' },
    { name: 'About', sectionId: 'about' },
    { name: 'Education', sectionId: 'education' },
    { name: 'Experience', sectionId: 'experience' },
    { name: 'Projects', sectionId: 'projects' },
    { name: 'Tech Stack', sectionId: 'tech-stack' },
    { name: 'Contact', sectionId: 'contact' },
  ]

  return (
    <footer
      id="footer"
      className="border-accent/5 bg-surface/30 relative mt-auto border-t backdrop-blur-sm"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(56,189,248,0.1), transparent 70%)',
        }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <button onClick={() => scrollToSection('top')} className="mb-4 flex items-center">
              <Image
                src="/profile.jpeg"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2 rounded-full"
              />
              <span className="text-accent text-xl font-bold">Kristiyan Cholakov</span>
            </button>
            <p className="text-text-muted mb-4 max-w-xs text-sm">
              Building innovative solutions at the intersection of technology and creativity.
            </p>
            <div className="mt-auto flex space-x-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface/50 text-text-muted hover:text-accent flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                  whileHover={{ y: -3 }}
                  aria-label={link.name}
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-text-primary mb-2 text-sm font-semibold tracking-wider uppercase">
              Navigation
            </h3>
            <hr className="border-accent/10 mb-4 border-t" />
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-text-primary mb-4 text-sm font-semibold tracking-wider uppercase">
              Contact
            </h3>
            <p className="text-text-muted mb-4 text-sm">
              Have a project in mind? Let&#39;s connect and discuss how we can work together.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-accent hover:bg-accent/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="bg-accent/10 my-8 h-px w-full" />

        {/* Bottom row - simplified */}
        <div className="text-text-muted flex flex-col items-center justify-between gap-4 text-sm md:flex-row md:text-left">
          <div>© {currentYear} Kristiyan Cholakov. All rights reserved.</div>
          <div>
            Built with <span className="text-accent">Next.js</span> | Deployed on{' '}
            <span className="text-accent">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
