'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/yourusername' },
    { name: 'Email', icon: Mail, href: 'mailto:your.email@example.com' },
  ]

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Tech Stack', href: '/#tech-stack' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <footer className="border-accent/10 bg-surface/30 relative mt-20 overflow-hidden border-t backdrop-blur-sm">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(56,189,248,0.1), transparent 70%)',
        }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <Link href="/" className="mb-4 flex items-center">
              <Image src="/profile.jpeg" alt="Logo" width={40} height={40} className="mr-2" />
              <span className="text-accent text-xl font-bold">Your Name</span>
            </Link>
            <p className="text-text-muted mb-4 max-w-xs text-sm">
              Building innovative solutions at the intersection of technology and creativity.
            </p>
            <div className="mt-auto flex space-x-3">
              {socialLinks.map(link => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent bg-surface/50 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
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
            <h3 className="text-text-primary mb-4 text-sm font-semibold tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Latest Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-text-primary mb-4 text-sm font-semibold tracking-wider uppercase">
              Latest Projects
            </h3>
            <ul className="space-y-3">
              {[1, 2, 3].map(i => (
                <li key={i} className="flex items-center gap-2">
                  <Link
                    href={`/projects/project-${i}`}
                    className="text-text-muted hover:text-accent group flex items-center text-sm transition-colors"
                  >
                    <span>Project {i}</span>
                    <ExternalLink
                      size={14}
                      className="ml-1 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
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
            <Link
              href="/#contact"
              className="bg-accent hover:bg-accent/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="bg-accent/10 my-8 h-px w-full" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="text-text-muted text-sm">
            © {currentYear} Your Name. All rights reserved.
          </div>
          <div className="text-text-muted flex items-center gap-6 text-xs">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <span>Made with ❤️ using Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
