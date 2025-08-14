'use client'

import { useEffect, useState } from 'react'

const words = ['Elegância', 'Amor', 'Histórias', 'Momentos', 'Casamentos']

export function MorphingWords() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let timeout: NodeJS.Timeout

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, 80)
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => word.slice(0, prev.length + 1))
      }, 120)
    }

    if (!isDeleting && displayText === word) {
      timeout = setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex])

  return (
    <h2 className="text-4xl md:text-6xl font-bold text-center text-gold-200 h-20">
      {displayText}
      <span className="animate-pulse">|</span>
    </h2>
  )
}
