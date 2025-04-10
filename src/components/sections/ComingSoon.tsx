'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Server,
  Globe,
  Cpu,
  LayoutGrid,
} from 'lucide-react'
import TypingText from '@/components/ui/TypingText'

export default function ComingSoon() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set fixed launch date - April 20, 2025, 3PM Bulgarian time (UTC+3 during summer)
  useEffect(() => {
    const launchDate = new Date('2025-04-20T15:00:00+03:00')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Floating code icons for background
  const codeIcons = [
    { Icon: Code, top: '15%', left: '10%', size: 24, delay: 0, duration: 20 },
    { Icon: Database, top: '25%', right: '15%', size: 28, delay: 1.5, duration: 25 },
    { Icon: Server, bottom: '20%', left: '12%', size: 20, delay: 0.8, duration: 22 },
    { Icon: Globe, bottom: '30%', right: '10%', size: 26, delay: 2, duration: 18 },
    { Icon: Cpu, top: '40%', left: '20%', size: 22, delay: 0.4, duration: 30 },
    { Icon: LayoutGrid, bottom: '15%', right: '20%', size: 25, delay: 1.2, duration: 28 },
  ]

  return (
    <main className="bg-background text-foreground relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(56,189,248,0.15), transparent 70%)',
        }}
      />

      {/* Animated code icons in background */}
      {codeIcons.map(({ Icon, top, left, right, bottom, size, delay, duration }, index) => (
        <motion.div
          key={index}
          className="text-accent/10 absolute"
          style={{ top, left, right, bottom }}
          animate={{
            y: ['-15px', '15px', '-15px'],
            x: ['10px', '-10px', '10px'],
            rotate: ['-5deg', '5deg', '-5deg'],
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

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Logo and header */}
        <motion.div
          className="mb-16 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="bg-secondary mb-6 flex h-16 w-16 items-center justify-center rounded-xl backdrop-blur-md"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <span className="text-accent text-3xl font-bold">KC</span>
          </motion.div>

          <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl">
            <span className="text-accent">Portfolio</span> Coming Soon
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-accent mx-auto mb-6 h-1"
          />

          <p className="text-foreground mb-8 max-w-2xl text-xl">
            <TypingText
              text="I'm creating something special. My new portfolio site will be launching soon."
              delay={40}
            />
          </p>
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="border-border bg-card grid grid-cols-2 gap-4 rounded-xl border p-8 backdrop-blur-md sm:grid-cols-4">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="text-accent mb-1 text-3xl font-bold sm:text-5xl">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-muted-foreground text-xs tracking-wider uppercase sm:text-sm">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Launch info */}
        <motion.div
          className="mb-16 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="border-border bg-card rounded-xl border p-8 backdrop-blur-md">
            <h3 className="mb-6 text-center text-xl font-medium">
              Launching on <span className="text-accent">April 20, 2025 at 3:00 PM</span>
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-secondary flex items-center gap-2 rounded-lg px-4 py-2"
              >
                <Code size={18} className="text-accent" />
                <span>Full-stack Development</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-secondary flex items-center gap-2 rounded-lg px-4 py-2"
              >
                <Cpu size={18} className="text-accent" />
                <span>AI Projects</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-secondary flex items-center gap-2 rounded-lg px-4 py-2"
              >
                <LayoutGrid size={18} className="text-accent" />
                <span>UI/UX Design</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="mb-4 text-sm">Connect with me in the meantime</p>

          <div className="flex justify-center space-x-4">
            {[
              { icon: Github, href: 'https://github.com/KristiyanCholakov', label: 'GitHub' },
              {
                icon: Linkedin,
                href: 'https://linkedin.com/in/kristiyan-cholakov',
                label: 'LinkedIn',
              },
              { icon: Mail, href: 'mailto:krischolakov@icloud.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border text-muted-foreground hover:border-accent hover:text-accent flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated decoration - bottom */}
      <motion.div
        className="bg-secondary/20 absolute bottom-0 h-20 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 85%)',
        }}
      />
    </main>
  )
}
