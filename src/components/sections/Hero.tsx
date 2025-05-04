'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import TypingText from '@/components/ui/TypingText'
import { useRef, useEffect, useState } from 'react'
import ScrollArrow from '@/components/ui/ScrollArrow'

export default function Hero() {
  const [particlesCount, setParticlesCount] = useState(50)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Theme colors for consistent styling
    const accentColor = { r: 56, g: 189, b: 248 } // #38bdf8 from theme
    const highlightColor = { r: 14, g: 165, b: 233 } // #0ea5e9 - a deeper blue
    const dataColor = { r: 2, g: 132, b: 199 } // #0284c7 - an even deeper blue

    // Create particles with more variety
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      connections: number[]
      alpha: number
      baseAlpha: number
      type: 'normal' | 'highlight' | 'data'
      oscillationSpeed: number
      oscillationOffset: number
      flashValue: number
      flashActive: boolean
    }[] = []

    // Track flash propagation
    let flashOriginIndex = -1
    let flashTimer = 0
    const flashInterval = 3000 // Time between flash events
    const flashPropagationSpeed = 150 // Speed of propagation
    const maxFlashDistance = 6 // How many "hops" away the flash can travel

    // Different particle types for visual interest
    for (let i = 0; i < particlesCount; i++) {
      // Random particle type (80% normal, 15% highlight, 5% data nodes)
      const typeRand = Math.random()
      const type = typeRand > 0.95 ? 'data' : typeRand > 0.8 ? 'highlight' : 'normal'

      // Size and speed based on type
      const sizeFactor = type === 'data' ? 2.5 : type === 'highlight' ? 1.5 : 1
      const speedFactor = type === 'data' ? 0.5 : type === 'highlight' ? 0.8 : 1

      const baseAlpha =
        type === 'data' ? 0.6 : type === 'highlight' ? 0.5 : 0.1 + Math.random() * 0.3

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 2 + 1) * sizeFactor,
        speedX: (Math.random() - 0.5) * 0.15 * speedFactor,
        speedY: (Math.random() - 0.5) * 0.15 * speedFactor,
        connections: [],
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        type,
        oscillationSpeed: Math.random() * 0.01 + 0.005,
        oscillationOffset: Math.random() * Math.PI * 2,
        flashValue: 0,
        flashActive: false,
      })
    }

    // Enhanced connection logic with more dynamic behavior
    const connectParticles = () => {
      // Different connection distances based on particle types
      const baseMaxDistance = canvas.width * 0.12

      // Reset connections
      particles.forEach((p) => (p.connections = []))

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

    // Start a new flash propagation from a random particle
    const startNewFlash = () => {
      // Reset all particle flash values
      particles.forEach((p) => {
        p.flashValue = 0
        p.flashActive = false
      })

      // Choose a random particle as the flash origin (prefer data or highlight particles)
      const potentialOrigins = particles
        .map((p, i) => ({ index: i, type: p.type }))
        .filter((p) => p.type === 'data' || p.type === 'highlight' || Math.random() < 0.2)

      if (potentialOrigins.length === 0) {
        flashOriginIndex = Math.floor(Math.random() * particles.length)
      } else {
        flashOriginIndex =
          potentialOrigins[Math.floor(Math.random() * potentialOrigins.length)].index
      }

      // Initialize the flash at the origin
      particles[flashOriginIndex].flashValue = 1
      particles[flashOriginIndex].flashActive = true

      // Compute propagation distances from origin
      const distances = new Array(particles.length).fill(Infinity)
      distances[flashOriginIndex] = 0

      // BFS to compute distances
      const queue: number[] = [flashOriginIndex]
      while (queue.length > 0) {
        const current = queue.shift()!
        const currentDistance = distances[current]

        if (currentDistance >= maxFlashDistance) continue

        for (const neighborIdx of particles[current].connections) {
          if (distances[neighborIdx] === Infinity) {
            distances[neighborIdx] = currentDistance + 1
            queue.push(neighborIdx)
          }
        }
      }

      // Assign propagation delays based on distances
      particles.forEach((p, i) => {
        if (distances[i] < Infinity) {
          // This sets a delay for when this particle's flash will start
          // The setTimeout is internal to the animation loop
          setTimeout(() => {
            p.flashActive = true
          }, distances[i] * flashPropagationSpeed)
        }
      })
    }

    // Animation loop with network flashing effects
    let animationId: number
    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimestamp
      lastTimestamp = timestamp

      // Update flash timer
      flashTimer += deltaTime
      if (flashTimer >= flashInterval) {
        flashTimer = 0
        startNewFlash()
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections with flash effects
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update flash values for active particles
        if (p.flashActive) {
          // Smooth increase of flash value
          p.flashValue = Math.min(p.flashValue + 0.05, 1)

          // After reaching full flash, start decreasing
          if (p.flashValue === 1) {
            p.flashActive = false
          }
        } else if (p.flashValue > 0) {
          // Smooth decrease of flash value
          p.flashValue = Math.max(p.flashValue - 0.02, 0)
        }

        // Draw connections with varied styles based on flash state
        for (const j of p.connections) {
          const p2 = particles[j]

          // Calculate line opacity based on distance and types
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = canvas.width * 0.12

          // Higher base opacity for connections between special nodes
          let baseOpacity = 0.25 // Increased from 0.15 for more pronounced links
          if (p.type === 'data' && p2.type === 'data') {
            baseOpacity = 0.6 // Increased from 0.5
          } else if (p.type === 'data' || p2.type === 'data') {
            baseOpacity = 0.4 // Increased from 0.3
          } else if (p.type === 'highlight' || p2.type === 'highlight') {
            baseOpacity = 0.35 // Increased from 0.25
          }

          // Calculate flash effect for the connection (max of both connected particles)
          const connectionFlash = Math.max(p.flashValue, p2.flashValue)

          // Increase opacity when flashing
          let opacity = baseOpacity * (1 - distance / maxDistance)
          opacity = opacity + (0.9 - opacity) * connectionFlash // Increased from 0.8 to 0.9 for brighter flash

          // Use the theme accent color as base
          let r = accentColor.r
          let g = accentColor.g
          let b = accentColor.b

          // When flashing, shift to a brighter blue rather than changing hue
          if (connectionFlash > 0) {
            // Increase intensity of blue when flashing, while maintaining blue hue
            r = Math.min(r + connectionFlash * 40, 120) // Slight increase in red
            g = Math.min(g + connectionFlash * 40, 220) // Moderate increase in green
            b = Math.min(b + connectionFlash * 20, 255) // Small increase in blue to maintain blue tone
          }

          // Different color for special node connections
          if (p.type === 'data' || p2.type === 'data') {
            r = dataColor.r + connectionFlash * 60
            g = dataColor.g + connectionFlash * 50
            b = dataColor.b + connectionFlash * 40
          } else if (p.type === 'highlight' || p2.type === 'highlight') {
            r = highlightColor.r + connectionFlash * 50
            g = highlightColor.g + connectionFlash * 40
            b = highlightColor.b + connectionFlash * 30
          }

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }

      // Draw particles with consistent visuals
      particles.forEach((p) => {
        // Update position
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

        // Make particles also slightly brighter during flash
        const particleAlpha = p.baseAlpha + (1 - p.baseAlpha) * p.flashValue * 0.5

        // Use only blue theme colors for all particle types
        if (p.type === 'data') {
          ctx.fillStyle = `rgba(${dataColor.r}, ${dataColor.g}, ${dataColor.b}, ${particleAlpha})`
        } else if (p.type === 'highlight') {
          ctx.fillStyle = `rgba(${highlightColor.r}, ${highlightColor.g}, ${highlightColor.b}, ${particleAlpha})`
        } else {
          ctx.fillStyle = `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${particleAlpha})`
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw rings around data nodes
        if (p.type === 'data') {
          ctx.strokeStyle = `rgba(${dataColor.r}, ${dataColor.g}, ${dataColor.b}, ${particleAlpha * 0.6})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    // Start first flash effect
    startNewFlash()

    // Start animation loop
    animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasDimensions)
    }
  }, [particlesCount])

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

      {/* Add ScrollArrow at the end of the component, just before the closing tag */}
      <div className="absolute right-0 bottom-12 left-0 z-10">
        <ScrollArrow targetSection="about" label="Discover more about me" />
      </div>
    </section>
  )
}
