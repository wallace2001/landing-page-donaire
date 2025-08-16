/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion, Variants } from 'framer-motion'
import { ExternalLink, Instagram, Play, Youtube } from 'lucide-react'
import { useRef, useState } from 'react'

type Source = 'instagram' | 'youtube' | 'site' | 'vimeo'

type VideoItem = {
  /** teaser curto (alguns segundos) que você vai deixar no projeto */
  previewSrc: string
  /** texto alternativo */
  alt: string
  /** link do vídeo completo (Instagram/YouTube/etc.) */
  externalUrl: string
  /** plataforma (para o rótulo e ícone) */
  source: Source
}

const VIDEOS: VideoItem[] = [
  {
    previewSrc: '/videos/video1.mov',
    alt: 'Casal na Torre Eiffel',
    externalUrl:
      'https://www.instagram.com/reel/DMnYaOOOdvj/?igsh=OTluenBmaXM4cTA0',
    source: 'instagram',
  },
  {
    previewSrc: '/videos/video3.mov',
    alt: 'Noiva no jardim',
    externalUrl: 'youtube.com/watch?feature=shared&v=U0ViLgdRYPMs',
    source: 'youtube',
  },
  {
    previewSrc: '/videos/video2.mov',
    alt: 'Close da noiva',
    externalUrl: 'https://www.instagram.com/reel/DMxkq5hxQwq4cghai5YqJWQgZPQz9KQS-FodNY0/?igsh=NzFpb2Zjcmx6YzEx',
    source: 'instagram',
  },
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
          Nossos{' '}
          <span className="bg-gradient-to-r from-[#F5BC7B] to-[#E08B5B] bg-clip-text text-transparent">
            Trabalhos
          </span>
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
    } catch {}
  }

  const { label, Icon } = getPlatformMeta(item.source)

  return (
    <div className="flex flex-col">
      <motion.div
        className="group relative overflow-hidden rounded-2xl"
        variants={cardVariants}
        whileHover={{ y: -4 }}
        transition={{ type: 'tween', duration: 0.25 }}
      >
        {/* badge da plataforma (opcional) */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white backdrop-blur">
          <Icon className="h-3.5 w-3.5" />
          <span>{label}</span>
        </div>

        {/* teaser mudo em loop */}
        <div className="relative aspect-[16/9] w-full">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={item.previewSrc}
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

        {/* overlay "Ativar som" (some após iniciar) */}
        {!started && (
          <button
            type="button"
            onClick={handleStart}
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
            aria-label="Reproduzir teaser com som"
          >
            {/* glow pulsante */}
            <motion.span
              className="absolute h-40 w-40 rounded-full bg-white/20 backdrop-blur-[1px]"
              animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.3, 0.18] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* botão play pulsando */}
            <motion.span
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/80 text-white shadow-xl"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.96 }}
            >
              <Play className="ml-0.5 h-8 w-8" />
            </motion.span>
          </button>
        )}
      </motion.div>

      {/* CTA para o original */}
      <a
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
        aria-label={`Ver vídeo completo no ${label}`}
      >
        <Icon className="h-4 w-4" />
        Ver completo no {label}
      </a>
    </div>
  )
}

/* util: rótulo e ícone por plataforma */
function getPlatformMeta(source: Source): { label: string; Icon: React.ComponentType<any> } {
  switch (source) {
    case 'instagram':
      return { label: 'Instagram', Icon: Instagram }
    case 'youtube':
      return { label: 'YouTube', Icon: Youtube }
    case 'vimeo':
      return { label: 'Vimeo', Icon: ExternalLink }
    default:
      return { label: 'site', Icon: ExternalLink }
  }
}
