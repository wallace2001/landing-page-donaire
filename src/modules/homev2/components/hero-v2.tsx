'use client'

import { MorphingWords } from '@/components/morphing-words'
import { Button } from '@/components/ui/button'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef } from 'react'

// ====== Tempos ======
const ENTER_DUR = 0.9
const STAGGER = 0.12
const BG_DUR = 2.2
const BG_DELAY = 0.15

// Variantes
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: STAGGER } },
}
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: ENTER_DUR, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

export default function HeroV2() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // garante autoplay/inline no mobile e pausa quando sai do viewport
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // atributos/propriedades que ajudam no iOS/Android
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')

    const tryPlay = () => v.play().catch(() => {}) // ignora bloqueios
    const onLoaded = () => tryPlay()

    v.addEventListener('loadeddata', onLoaded, { once: true })

    // play/pause conforme visibilidade do herói
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
        else v.pause()
      },
      { threshold: 0.2 }
    )
    io.observe(v)

    // se a aba voltar a ficar visível, tenta tocar de novo
    const onVis = () => {
      if (!document.hidden) tryPlay()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      v.removeEventListener('loadeddata', onLoaded)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
        {/* BG vídeo com leve zoom-out cinematográfico */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'tween', duration: BG_DUR, delay: BG_DELAY, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 will-change-transform transform-gpu pointer-events-none"
          aria-hidden
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/hero.MOV"
            poster="/teaser/teaser1.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Conteúdo */}
        <motion.div
          className="relative z-20 max-w-4xl px-4 text-white"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <motion.span
            className="block text-3xl font-extralight leading-tight sm:text-5xl md:text-6xl"
            variants={fadeUp()}
          >
            Transformamos o seu sonho em um evento inesquecível com <br />
            <span className="inline-block align-top">
              <MorphingWords />
            </span>
          </motion.span>

          <motion.p className="mt-4 text-base font-light md:text-lg" variants={fadeUp(0.05)}>
            Transforme o seu grande dia em uma experiência inesquecível com uma assessoria que cuida de cada detalhe com sofisticação e amor.
          </motion.p>

          <motion.div variants={fadeUp(0.1)}>
            <Button className="mt-8 rounded-full px-10 py-8 text-md bg-gold-500 text-white hover:bg-gold-600">
              Quero meu orçamento personalizado
            </Button>
          </motion.div>
        </motion.div>

        {/* Onda + seta */}
        <div className="absolute bottom-0 z-20 w-full overflow-hidden">
          <svg
            className="h-32 w-full text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#fff" />
          </svg>

          <motion.div
            className="flex -mt-8 justify-center"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'tween', duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArrowDown className="h-8 w-8 animate-bounce" style={{ color: '#153b3d' }} />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}