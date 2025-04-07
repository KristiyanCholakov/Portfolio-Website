'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import TypingText from '@/components/ui/TypingText'
import { useRef, useEffect, useState } from 'react'

export default function Hero() {
  const [particlesCount, setParticlesCount] = useState(50)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false)

  // Adjust particle count based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setParticlesCount(30)
      } else if (width < 1024) {
        setParticlesCount(50)
      } else {
        setParticlesCount(70)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Canvas animation for neural network effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Track mouse position for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => setIsMouseInCanvas(true)
    const handleMouseLeave = () => setIsMouseInCanvas(false)

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)

    // Create particles with more variety
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      connections: number[]
      alpha: number
      type: 'normal' | 'highlight' | 'data'
      oscillationSpeed: number
      oscillationOffset: number
    }[] = []

    // Different particle types for visual interest
    for (let i = 0; i < particlesCount; i++) {
      // Random particle type (80% normal, 15% highlight, 5% data nodes)
      const typeRand = Math.random()
      const type = typeRand > 0.95 ? 'data' : typeRand > 0.8 ? 'highlight' : 'normal'

      // Size and speed based on type
      const sizeFactor = type === 'data' ? 2.5 : type === 'highlight' ? 1.5 : 1
      const speedFactor = type === 'data' ? 0.5 : type === 'highlight' ? 0.8 : 1

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 2 + 1) * sizeFactor,
        speedX: (Math.random() - 0.5) * 0.15 * speedFactor,
        speedY: (Math.random() - 0.5) * 0.15 * speedFactor,
        connections: [],
        alpha: type === 'data' ? 0.6 : type === 'highlight' ? 0.5 : 0.1 + Math.random() * 0.3,
        type,
        oscillationSpeed: Math.random() * 0.01 + 0.005,
        oscillationOffset: Math.random() * Math.PI * 2,
      })
    }

    // Enhanced connection logic with more dynamic behavior
    const connectParticles = () => {
      // Different connection distances based on particle types
      const baseMaxDistance = canvas.width * 0.12

      // Reset connections
      particles.forEach(p => (p.connections = []))

      // Find connections with varied distances by type
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        // Data nodes can connect at greater distances
        const maxDistance =
          p1.type === 'data'
            ? baseMaxDistance * 1.5
            : p1.type === 'highlight'
              ? baseMaxDistance * 1.2
              : baseMaxDistance

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // More connections for data and highlight nodes
          const connectionThreshold =
            p1.type === 'data' || p2.type === 'data'
              ? maxDistance
              : p1.type === 'highlight' || p2.type === 'highlight'
                ? maxDistance * 0.9
                : maxDistance * 0.8

          if (distance < connectionThreshold) {
            p1.connections.push(j)
          }
        }
      }
    }

    connectParticles()

    // Animation loop with enhanced effects
    let animationId: number
    let lastPulseTime = 0
    const pulseInterval = 4000 // Slightly more frequent pulses
    let activePulses: Array<{
      origin: number
      time: number
      duration: number
      color: string
    }> = []

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()

      // Randomly start new pulses
      if (now - lastPulseTime > pulseInterval) {
        // Use data nodes as pulse origins when possible
        const dataNodes = particles
          .map((p, i) => ({ index: i, type: p.type }))
          .filter(p => p.type === 'data')

        const origin =
          dataNodes.length > 0
            ? dataNodes[Math.floor(Math.random() * dataNodes.length)].index
            : Math.floor(Math.random() * particles.length)

        // Only blue theme colors with different intensities
        const colors = [
          'rgba(56, 189, 248, alpha)', // Accent (default)
          'rgba(6, 182, 212, alpha)', // Darker cyan blue
          'rgba(125, 211, 252, alpha)', // Lighter blue
        ]

        const color =
          Math.random() > 0.7 ? colors[Math.floor(Math.random() * colors.length)] : colors[0]

        activePulses.push({
          origin,
          time: now,
          duration: 2500 + Math.random() * 1000,
          color,
        })

        lastPulseTime = now
      }

      // Mouse interaction - create subtle attraction or effect
      if (isMouseInCanvas) {
        particles.forEach(p => {
          const dx = mousePosition.x - p.x
          const dy = mousePosition.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            // Subtle attraction toward mouse
            const force = (1 - distance / maxDistance) * 0.02
            p.speedX += (dx * force) / distance
            p.speedY += (dy * force) / distance

            // Limit speed
            const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY)
            if (speed > 0.5) {
              p.speedX = (p.speedX / speed) * 0.5
              p.speedY = (p.speedY / speed) * 0.5
            }
          }
        })
      }

      // Draw connections with enhanced visuals
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply oscillation to certain particle types
        if (p.type === 'data' || p.type === 'highlight') {
          p.x += Math.sin(now * p.oscillationSpeed + p.oscillationOffset) * 0.1
          p.y += Math.cos(now * p.oscillationSpeed + p.oscillationOffset) * 0.1
        }

        // Draw connections with varied styles
        for (const j of p.connections) {
          const p2 = particles[j]

          // Calculate line opacity based on distance and types
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = canvas.width * 0.12

          // Higher base opacity for connections between special nodes
          let baseOpacity = 0.15
          if (p.type === 'data' && p2.type === 'data') {
            baseOpacity = 0.5
          } else if (p.type === 'data' || p2.type === 'data') {
            baseOpacity = 0.3
          } else if (p.type === 'highlight' || p2.type === 'highlight') {
            baseOpacity = 0.25
          }

          let opacity = baseOpacity * (1 - distance / maxDistance)

          // Apply pulse effects from all active pulses
          for (const pulse of activePulses) {
            const timeFactor = 1 - Math.min(1, (now - pulse.time) / pulse.duration)

            // Apply pulse effect based on network proximity
            let pulseOpacity = 0
            if (i === pulse.origin || j === pulse.origin) {
              pulseOpacity = 0.7 * timeFactor
            } else if (
              particles[pulse.origin].connections.includes(i) ||
              particles[pulse.origin].connections.includes(j)
            ) {
              pulseOpacity = 0.5 * timeFactor
            } else if (
              particles[pulse.origin].connections.some(
                k => particles[k].connections.includes(i) || particles[k].connections.includes(j)
              )
            ) {
              // Secondary connections (2 hops away)
              pulseOpacity = 0.3 * timeFactor
            }

            opacity = Math.max(opacity, pulseOpacity)
          }

          // Determine connection color based on active pulses
          let strokeColor = `rgba(56, 189, 248, ${opacity})`
          for (const pulse of activePulses) {
            if (
              (i === pulse.origin ||
                j === pulse.origin ||
                particles[pulse.origin].connections.includes(i) ||
                particles[pulse.origin].connections.includes(j)) &&
              pulse.color !== 'rgba(56, 189, 248, alpha)'
            ) {
              strokeColor = pulse.color.replace('alpha', String(opacity))
              break
            }
          }

          ctx.strokeStyle = strokeColor
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }

      // Draw particles with enhanced visuals
      particles.forEach((p, i) => {
        // Update position with slight damping for more natural movement
        p.x += p.speedX
        p.y += p.speedY

        // Gradual speed reduction for more natural movement
        p.speedX *= 0.995
        p.speedY *= 0.995

        // Occasionally add small random impulses
        if (Math.random() < 0.01) {
          p.speedX += (Math.random() - 0.5) * 0.02
          p.speedY += (Math.random() - 0.5) * 0.02
        }

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Calculate particle color/size based on type and pulses
        let particleAlpha = p.alpha
        let particleSize = p.size
        let particleColor = `rgba(56, 189, 248, ${particleAlpha})`

        // Apply effects from all active pulses
        for (const pulse of activePulses) {
          const timeFactor = 1 - Math.min(1, (now - pulse.time) / pulse.duration)

          if (i === pulse.origin) {
            particleAlpha = Math.max(particleAlpha, 0.9 * timeFactor)
            particleSize = p.size + 3 * timeFactor
            particleColor = pulse.color.replace('alpha', String(particleAlpha))
          } else if (particles[pulse.origin].connections.includes(i)) {
            particleAlpha = Math.max(particleAlpha, 0.7 * timeFactor)
            particleSize = p.size + 1.5 * timeFactor
            particleColor = pulse.color.replace('alpha', String(particleAlpha))
          } else if (
            particles[pulse.origin].connections.some(k => particles[k].connections.includes(i))
          ) {
            // Secondary effect (2 hops away)
            particleAlpha = Math.max(particleAlpha, 0.5 * timeFactor)
            particleSize = p.size + 0.5 * timeFactor
          }
        }

        // Use only blue theme colors for all particle types
        if (p.type === 'data') {
          ctx.fillStyle = 'rgba(14, 165, 233, ' + particleAlpha + ')' // Lighter blue
        } else if (p.type === 'highlight') {
          ctx.fillStyle = 'rgba(2, 132, 199, ' + particleAlpha + ')' // Darker blue
        } else {
          ctx.fillStyle = particleColor
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw rings around data nodes
        if (p.type === 'data') {
          ctx.strokeStyle = 'rgba(14, 165, 233, ' + particleAlpha * 0.6 + ')'
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(p.x, p.y, particleSize + 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Remove completed pulses
      activePulses = activePulses.filter(pulse => now - pulse.time <= pulse.duration)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasDimensions)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [particlesCount, isMouseInCanvas, mousePosition])

  return (
    <section
      id="hero"
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 pt-16 pb-12 sm:min-h-[70vh] sm:px-6 sm:pt-20 sm:pb-16 lg:px-8"
    >
      {/* Neural network background */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Enhanced glass overlay with wider border gradient */}
      <div
        className="absolute inset-0 z-[5] backdrop-blur-[2px]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(17,17,17,0.4) 0%, rgba(10,10,10,0.8) 70%)',
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8), inset 0 0 60px rgba(56,189,248,0.15)',
          border: '1px solid rgba(56,189,248,0.1)',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[6] opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Content section */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Profile Picture with Organic Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6 flex items-center justify-center"
        >
          {/* Glowing Animated Blobs Behind Image */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 sm:h-[340px] sm:w-[340px]">
            <motion.div
              className="bg-accent/30 absolute top-0 left-0 h-full w-full blur-[100px]"
              style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 15, -10, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="bg-highlight/25 absolute top-[12%] left-[12%] h-[76%] w-[76%] blur-[80px]"
              style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
              animate={{ scale: [1, 1.05, 1], rotate: [-10, 5, -3, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="border-accent/40 absolute top-[20%] left-[20%] h-[60%] w-[60%] border-2"
              style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Inner blob container with gradient border and image */}
          <motion.div
            className="from-accent to-highlight relative z-10 bg-gradient-to-tr p-[4px]"
            style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
            animate={{ scale: [1, 1.01, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="bg-background relative aspect-square w-28 p-1 sm:w-32 md:w-36"
              style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
            >
              <Image
                src="/profile.jpeg"
                alt="Kristiyan Cholakov"
                fill
                className="object-cover"
                style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-accent text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          <TypingText text="Kristiyan Cholakov" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-text-muted mt-4 max-w-2xl text-sm sm:text-base md:text-lg"
        >
          <TypingText
            text="Computer Science graduate specializing in Artificial Intelligence and Data Science."
            delay={30}
            className="inline-block"
          />
        </motion.p>
      </div>
    </section>
  )
}
