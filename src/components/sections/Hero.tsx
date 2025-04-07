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
      {/* Animated Tiles Background */}
      <div className="absolute inset-0 -z-10 grid grid-cols-12 grid-rows-6 gap-1 opacity-10">
        {[...Array(72)].map((_, i) => (
          <div
            key={i}
            className="bg-surfaceLight animate-flip h-full w-full"
            style={{ animationDelay: `${(Math.sin(i) + 1) * 0.5}s` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Wavy Double Border Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6 rounded-full p-2"
        >
          {/* Outer border */}
          <motion.div
            className="from-highlight to-accent absolute inset-0 rounded-full bg-gradient-to-r opacity-60 blur-lg"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.02, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'easeInOut',
            }}
          />
          {/* Inner border */}
          <div className="from-accent to-highlight relative z-10 rounded-full bg-gradient-to-tr p-[3px]">
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
          </div>
        </motion.div>

        {/* Name Typing */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-accent text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          <TypingText text="Kristiyan Cholakov" />
        </motion.h1>

        {/* Subtitle Typing */}
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
