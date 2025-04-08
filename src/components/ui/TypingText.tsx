'use client'

import { useEffect, useState } from 'react'

export default function TypingText({
  text,
  delay = 75,
  className = '',
}: {
  text: string
  delay?: number
  className?: string
}) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTyped(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, delay)
    return () => clearInterval(interval)
  }, [text, delay])

  return (
    <span className={className}>
      {typed}
      <span className="animate-pulse"></span>
    </span>
  )
}
