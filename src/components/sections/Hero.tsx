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
      {/* Content */}
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Profile Picture with Organic Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6 flex items-center justify-center"
        >
          {/* Glowing Animated Blobs Behind Image */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2">
            {/* Glow Layer 1 */}
            <motion.div
              className="bg-accent/30 absolute top-0 left-0 h-full w-full blur-[100px]"
              style={{
                borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 15, -10, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Glow Layer 2 */}
            <motion.div
              className="bg-highlight/25 absolute top-[12%] left-[12%] h-[76%] w-[76%] blur-[80px]"
              style={{
                borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
              }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [-10, 5, -3, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Glow Ring Pulse */}
            <motion.div
              className="border-accent/40 absolute top-[20%] left-[20%] h-[60%] w-[60%] border-2"
              style={{
                borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
              }}
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Inner blob container with gradient border and image */}
          <motion.div
            className="from-accent to-highlight relative z-10 bg-gradient-to-tr p-[4px]"
            style={{
              borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
            }}
            animate={{
              scale: [1, 1.01, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="bg-background relative aspect-square w-40 p-1"
              style={{
                borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
              }}
            >
              <Image
                src="/profile.jpeg"
                alt="Kristiyan Cholakov"
                fill
                className="object-cover"
                style={{
                  borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
                }}
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
