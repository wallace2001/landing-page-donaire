'use client'

import { MorphingWords } from '@/components/morphing-words'
import { Button } from '@/components/ui/button'
import { useHeroVideo } from '@/hooks/use-hero-video'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import { CalendarCheck2, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent, useRef } from 'react'

/** Animations */
const ENTER_DUR = 0.9
const STAGGER = 0.12
const BG_DUR = 2.0
const BG_DELAY = 0.1

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: STAGGER } },
}
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: ENTER_DUR, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

export default function HeroV2() {
  const heroRef = useRef<HTMLVideoElement | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { ref: videoRef, fallback, ready } = useHeroVideo();

  /** Smooth anchor scroll respeitando header fixo */
  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerH = sectionRef.current ? sectionRef.current.offsetHeight * 0 : 0
    const top = el.getBoundingClientRect().top + window.scrollY - headerH
    window.scrollTo({ top, behavior: 'smooth' })
  }
  const handleNav = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToId(id)
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <MotionConfig reducedMotion="user">
      {/* svh = altura correta em mobile; safe-areas pros iPhones com notch */}
      <section
        ref={sectionRef}
        className="relative isolate flex min-h-[92svh] md:min-h-screen w-full overflow-clip bg-black pt-[env(safe-area-inset-top)]"
        aria-label="Hero Donaire Cerimonial"
      >
        {/* BACKDROP (vídeo + poster + fallback) */}
        <motion.div
          initial={{ scale: 1.02, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'tween', duration: BG_DUR, delay: BG_DELAY, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10 will-change-transform transform-gpu pointer-events-none"
          aria-hidden
        >
        <div className="absolute inset-0 -z-10">
          {!fallback && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover object-[center_45%] sm:object-[center_35%]"
              autoPlay
              muted
              loop
              playsInline
              preload="none"               // ✅ não baixa nada até injetarmos sources
              poster="/images/hero-poster.jpg"
              disablePictureInPicture      // opcional
              controls={false}
            />
          )}
          {fallback && (
            <Image
              src="/images/hero-poster.jpg"
              alt=""
              fill
              priority
              className="object-cover object-[center_45%] sm:object-[center_35%]"
              sizes="100vw"
            />
          )}
        </div>

          {/* Vignette + gradient para legibilidade perfeita */}
          <div className="absolute inset-0 bg-black/20 sm:bg-black/30" />
          <div className="absolute inset-y-0 left-0 w-[82%] sm:w-[60%] bg-gradient-to-r from-black via-black/60 to-transparent" />
          {/* Glass blur sutil atrás do conteúdo no mobile */}
          <div className="absolute left-0 top-0 h-full w-[65%] sm:w-0 backdrop-blur-[1.5px] sm:backdrop-blur-0" />
          {/* Noise granulado sutil (melhora sensação de luxo) */}
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: 'url(/textures/noise.png)' }}
          />
        </motion.div>

        {/* CONTEÚDO */}
        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 items-end mb-36 md:mb-0 md:items-center px-4 sm:px-6 md:px-10 lg:px-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <div className="ml-0 mr-auto w-full sm:max-w-2xl md:max-w-[640px] text-white">
            {/* badge sutil */}
            <motion.div
              variants={fadeUp(0)}
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              <span className="text-[11px] tracking-wide uppercase">Assessoria & Cerimonial Premium</span>
            </motion.div>

            {/* H1 acessível (sr-only texto completo + headline visual) */}
            <h1 className="sr-only">Donaire Cerimonial — casamentos com sofisticação, propósito e amor</h1>

            <motion.div variants={fadeUp(0.02)}>
              <div className="text-[clamp(22px,4.4vw,48px)] leading-[1.06] flex flex-col items-start font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                Transformamos o seu sonho em um momento inesquecível com{' '}
                <span className="inline-block align-top font-extralight">
                  <MorphingWords />
                </span>
              </div>
            </motion.div>

            <motion.p
              className="mt-3 hidden sm:block text-[clamp(14px,1.6vw,18px)] font-light opacity-95 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]"
              variants={fadeUp(0.05)}
            >
              Cuidamos de cada detalhe com sofisticação, sensibilidade e propósito — para que você viva o hoje,
              enquanto nós zelamos pelo inesquecível.
            </motion.p>

            {/* CTAs */}
            <motion.div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4" variants={fadeUp(0.08)}>
              <Link href="#contato" onClick={(e) => handleNav(e, 'contato')}>
                <Button
                  className="h-[46px] sm:h-[52px] rounded-full px-5 sm:px-6 text-[12px] sm:text-[15px] font-semibold
                             bg-gold-500 hover:bg-gold-600 text-black shadow-[0_8px_28px_rgba(243,198,78,0.35)]"
                >
                  QUERO MEU ORÇAMENTO PERSONALIZADO
                </Button>
              </Link>
            </motion.div>

            {/* Mini “prova social” opcional */}
            <motion.div
              variants={fadeUp(0.12)}
              className="mt-5 sm:mt-6 flex items-center gap-3 text-white/90"
              aria-label="Clientes e avaliações"
            >
              <CalendarCheck2 className="h-5 w-5" aria-hidden />
              <p className="text-xs sm:text-sm">
                +120 casamentos realizados &nbsp;•&nbsp; 5/5 de satisfação
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}
