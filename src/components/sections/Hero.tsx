'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import TypingText from '@/components/ui/TypingText'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-32 pb-24 sm:px-6 lg:px-8"
    >
      {/* Content Container */}
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Profile Picture with Animated Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6 flex items-center justify-center rounded-full"
        >
          {/* ⚡️ Outer glow animation - placed OUTSIDE and centered */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2">
            {/* Glow Layer 1 */}
            <motion.div
              className="from-accent to-highlight absolute top-0 left-0 h-full w-full rounded-full bg-gradient-to-tr opacity-30 blur-[100px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Glow Layer 2 */}
            <motion.div
              className="from-highlight to-accent absolute top-[10%] left-[10%] h-[80%] w-[80%] rounded-full bg-gradient-to-br opacity-40 blur-2xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Glow ring shimmer */}
            <motion.div
              className="border-accent/40 absolute top-[20%] left-[20%] h-[60%] w-[60%] rounded-full border-2"
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Actual image container with small inner border */}
          <motion.div
            className="from-accent to-highlight relative z-10 rounded-full bg-gradient-to-tr p-[3px]"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
            }}
          >
            <div className="bg-background rounded-full p-1">
              <Image
                src="/profile.jpeg"
                alt="Kristiyan Cholakov"
                width={160}
                height={160}
                className="rounded-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Typing Name */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-accent text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          <TypingText text="Kristiyan Cholakov" />
        </motion.h1>

        {/* Typing Subtitle */}
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
