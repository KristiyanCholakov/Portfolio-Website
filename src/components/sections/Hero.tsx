'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import TypingText from '@/components/ui/TypingText'
import ScrollArrow from '@/components/ui/ScrollArrow'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particlesCount, setParticlesCount] = useState(70)
  const [isDesktop, setIsDesktop] = useState(false)

  /* ── responsive particle counts ─────────────────────────────── */
  useEffect(() => {
    const decide = () => {
      const w = window.innerWidth
      setIsDesktop(w >= 1024)
      if (w < 480)
        setParticlesCount(45) // small phones
      else if (w < 640)
        setParticlesCount(65) // phones
      else if (w < 768)
        setParticlesCount(85) // large phones / small tablets
      else if (w < 1024)
        setParticlesCount(110) // tablets
      else setParticlesCount(140) // desktop / wide
    }
    decide()
    window.addEventListener('resize', decide, { passive: true })
    return () => window.removeEventListener('resize', decide)
  }, [])

  /* ── animation & network ────────────────────────────────────── */
  useEffect(() => {
    if (!particlesCount) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const setSize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = isDesktop ? window.devicePixelRatio || 1 : 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    setSize()
    addEventListener('resize', setSize)

    const accent = { r: 56, g: 189, b: 248 }
    const highlight = { r: 14, g: 165, b: 233 }
    const data = { r: 2, g: 132, b: 199 }

    type Kind = 'normal' | 'highlight' | 'data'
    interface Node {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      connections: number[]
      baseAlpha: number
      flash: number
      flashing: boolean
      type: Kind
    }

    /* nodes ---------------------------------------------------------------- */
    const nodes: Node[] = []
    for (let i = 0; i < particlesCount; i++) {
      const r = Math.random()
      const type: Kind = r > 0.95 ? 'data' : r > 0.8 ? 'highlight' : 'normal'
      const sizeF = type === 'data' ? 2.7 : type === 'highlight' ? 1.6 : 1
      const speedF = type === 'data' ? 0.4 : type === 'highlight' ? 0.7 : 1
      const baseA = type === 'data' ? 0.6 : type === 'highlight' ? 0.5 : 0.15 + Math.random() * 0.25
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 2 + 1) * sizeF,
        speedX: (Math.random() - 0.5) * 0.14 * speedF,
        speedY: (Math.random() - 0.5) * 0.14 * speedF,
        connections: [],
        baseAlpha: baseA,
        flash: 0,
        flashing: false,
        type,
      })
    }

    /* scale‑free preferential‑attachment linking --------------------------- */
    let linkRadius = 0

    const buildNetwork = () => {
      nodes.forEach((n) => (n.connections = []))
      const m = isDesktop ? 3 : 2 // links added per new node
      linkRadius = (isDesktop ? canvas.width * 0.4 : canvas.height) * 0.25

      const degrees = new Array(nodes.length).fill(0)

      for (let i = 1; i < nodes.length; i++) {
        /* gather predecessors within radius */
        const candidates: number[] = []
        let degreeSum = 0
        for (let j = 0; j < i; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (d < linkRadius) {
            candidates.push(j)
            degreeSum += degrees[j] + 1
          }
        }
        if (!candidates.length) continue

        const chosen = new Set<number>()
        const linksNeeded = Math.min(m, candidates.length)
        while (chosen.size < linksNeeded) {
          const r = Math.random() * degreeSum
          let acc = 0,
            pick = candidates[0]
          for (const j of candidates) {
            acc += degrees[j] + 1
            if (r <= acc) {
              pick = j
              break
            }
          }
          if (!chosen.has(pick)) chosen.add(pick)
        }

        /* register connections symmetrically */
        for (const j of chosen) {
          nodes[i].connections.push(j)
          nodes[j].connections.push(i)
          degrees[i]++
          degrees[j]++
        }
      }
    }
    buildNetwork()

    /* flashing ------------------------------------------------------------- */
    const flashInt = 3000,
      flashSpeed = 150,
      hops = 6
    let flTimer = 0,
      last = 0
    const startFlash = () => {
      nodes.forEach((n) => ((n.flash = 0), (n.flashing = false)))
      const hubPool = nodes
        .map((n, i) => ({ i, t: n.type }))
        .filter((o) => o.t !== 'normal' || Math.random() < 0.25)
      const origin = hubPool[Math.floor(Math.random() * hubPool.length)].i
      nodes[origin].flash = 1
      nodes[origin].flashing = true

      const dist = new Array(nodes.length).fill(Infinity)
      dist[origin] = 0
      const q = [origin]
      while (q.length) {
        const cur = q.shift()!
        if (dist[cur] >= hops) continue
        for (const nb of nodes[cur].connections)
          if (dist[nb] === Infinity) {
            dist[nb] = dist[cur] + 1
            q.push(nb)
          }
      }
      nodes.forEach((n, i) => {
        if (dist[i] < Infinity) setTimeout(() => (n.flashing = true), dist[i] * flashSpeed)
      })
    }

    /* drawing loop --------------------------------------------------------- */
    let id = 0
    const draw = (ts: number) => {
      const dt = ts - last
      last = ts
      flTimer += dt
      if (flTimer >= flashInt) {
        flTimer = 0
        startFlash()
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineWidth = 0.5

      /* edges */
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (const j of a.connections) {
          if (j < i) continue // draw each edge once
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          const maxD = linkRadius
          let op = 0.25 * (1 - d / maxD)
          if (a.type === 'data' && b.type === 'data') op = 0.6 * (1 - d / maxD)
          else if (a.type === 'data' || b.type === 'data') op = 0.4 * (1 - d / maxD)
          else if (a.type === 'highlight' || b.type === 'highlight') op = 0.35 * (1 - d / maxD)
          op += (0.9 - op) * Math.max(a.flash, b.flash)

          let c = accent
          if (a.type === 'data' || b.type === 'data') c = data
          else if (a.type === 'highlight' || b.type === 'highlight') c = highlight
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${op})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      /* nodes */
      nodes.forEach((n) => {
        if (n.flashing) {
          n.flash = Math.min(n.flash + 0.05, 1)
          if (n.flash === 1) n.flashing = false
        } else if (n.flash > 0) n.flash = Math.max(n.flash - 0.02, 0)

        n.x = (n.x + n.speedX + canvas.width) % canvas.width
        n.y = (n.y + n.speedY + canvas.height) % canvas.height
        n.speedX *= 0.995
        n.speedY *= 0.995
        if (Math.random() < 0.01) {
          n.speedX += (Math.random() - 0.5) * 0.02
          n.speedY += (Math.random() - 0.5) * 0.02
        }

        const alpha = n.baseAlpha + (1 - n.baseAlpha) * n.flash * 0.5
        const col = n.type === 'data' ? data : n.type === 'highlight' ? highlight : accent
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${alpha})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fill()
        if (n.type === 'data') {
          ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${alpha * 0.6})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.size + 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      id = requestAnimationFrame(draw)
    }

    startFlash()
    id = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(id)
      removeEventListener('resize', setSize)
    }
  }, [particlesCount, isDesktop])

  /* ── markup (unchanged except for canvas) ───────────────────── */
  return (
    <section
      id="hero"
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 pt-16 pb-12 sm:min-h-[70vh] sm:px-6 sm:pt-20 sm:pb-16 lg:px-8"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        className="absolute inset-0 z-[5] backdrop-blur-[2px]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(17,17,17,0.4) 0%, rgba(10,10,10,0.8) 70%)',
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8), inset 0 0 60px rgba(56,189,248,0.15)',
          border: '1px solid rgba(56,189,248,0.1)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[6] opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* outer glow hidden on mobile */}
        <div className="absolute top-1/2 left-1/2 -z-10 hidden h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 sm:block md:h-[300px] md:w-[300px]">
          <motion.div
            className="bg-accent/30 absolute top-0 left-0 h-full w-full blur-[90px]"
            style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
            animate={{ scale: [1, 1.07, 1], rotate: [0, 10, -5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6 flex items-center justify-center"
        >
          <motion.div
            className="from-accent to-highlight bg-gradient-to-tr p-[3px] sm:p-[4px]"
            style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
            animate={{ scale: [1, 1.01, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="bg-background relative aspect-square w-24 p-1 sm:w-32 md:w-36"
              style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
            >
              <Image
                src="/profile.jpeg"
                alt="Kristiyan Cholakov"
                fill
                priority
                className="object-cover"
                style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }}
              />
            </div>
          </motion.div>
        </motion.div>

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

      <div className="absolute right-0 bottom-12 left-0 z-10">
        <ScrollArrow targetSection="about" label="Discover more about me" />
      </div>
    </section>
  )
}
