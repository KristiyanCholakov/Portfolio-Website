import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { scrollToSection } from '@/utils/navigation'

interface ScrollArrowProps {
  targetSection: string
  label?: string
}

export default function ScrollArrow({ targetSection, label = 'Explore more' }: ScrollArrowProps) {
  return (
    <motion.div
      className="text-center mt-8 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onClick={() => scrollToSection(targetSection)}
    >
      <p className="text-text-muted mb-2 text-sm">{label}</p>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
        className="text-accent inline-block hover:scale-110"
        whileHover={{ scale: 1.2 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </motion.div>
  )
} 