'use client'

import { motion, Variants } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef, useState } from 'react'

type VideoItem = {
  src: string
  alt: string
}

const VIDEOS: VideoItem[] = [
  { src: '/videos/video1.mp4', alt: 'Casal na Torre Eiffel' },
  { src: '/videos/video3.mp4', alt: 'Noiva no jardim' },
  { src: '/videos/video3.mp4', alt: 'Close da noiva' },
]

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

export function ServicesSectionV2() {
  return (
    <section id="trabalhos" className="w-full bg-[#122d2f] px-6 pt-28 pb-20 md:px-20 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-2xl font-extrabold tracking-tight text-white md:text-4xl">
          Nossos <span className="bg-gradient-to-r from-[#F5BC7B] to-[#E08B5B] bg-clip-text text-transparent">Trabalhos</span>
        </h2>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} item={v} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function VideoCard({ item }: { item: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [started, setStarted] = useState(false)

  const handleStart = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      v.muted = false
      v.volume = 1
      v.controls = true
      await v.play()
      setStarted(true)
    } catch {
      // se o navegador bloquear, mantém o overlay
    }
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl"
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'tween', duration: 0.25 }}
    >
      {/* vídeo preview (autoplay mudo) */}
      <div className="relative aspect-[16/9] w-full">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={item.src}
          playsInline
          preload="metadata"
          autoPlay
          muted
          loop
          aria-label={item.alt}
        />
      </div>

      {/* borda/escurecer */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* overlay com play pulsando (some após iniciar) */}
      {!started && (
        <button
          type="button"
          onClick={handleStart}
          className="absolute inset-0 flex items-center justify-center focus:outline-none"
          aria-label="Reproduzir com som"
        >
          {/* glow pulsante */}
          <motion.span
            className="absolute h-40 w-40 rounded-full bg-white/20 backdrop-blur-[1px]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.3, 0.18] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* ícone play pulsando */}
          <motion.span
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/80 shadow-xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.96 }}
          >
            <Play className="ml-0.5 h-8 w-8 text-white" />
          </motion.span>
        </button>
      )}
    </motion.div>
  )
}
