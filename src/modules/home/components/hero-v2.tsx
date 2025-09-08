'use client'

import { MorphingWords } from '@/components/morphing-words'
import { Button } from '@/components/ui/button'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'

const ENTER_DUR = 0.9
const STAGGER = 0.12
const BG_DUR = 2.2
const BG_DELAY = 0.15

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
  const heroRef = useRef<HTMLVideoElement | null>(null)
  const ref = useRef<HTMLElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    hero.muted = true
    hero.defaultMuted = true
    hero.playsInline = true
    hero.setAttribute('playsinline', '')
    hero.setAttribute('webkit-playsinline', '')
    const tryPlay = (v: HTMLVideoElement) => v.play().catch(() => setFallback(true))
    const onHeroPlaying = () => setFallback(false)
    const onHeroError = () => setFallback(true)
    hero.addEventListener('playing', onHeroPlaying)
    hero.addEventListener('error', onHeroError)
    hero.addEventListener('stalled', onHeroError)
    hero.addEventListener('loadeddata', () => tryPlay(hero), { once: true })
    return () => {
      hero.removeEventListener('playing', onHeroPlaying)
      hero.removeEventListener('error', onHeroError)
      hero.removeEventListener('stalled', onHeroError)
    }
  }, [])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerH = ref.current ? ref.current.offsetHeight : 0
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
      {/* svh melhora a área útil no mobile */}
      <section className="relative flex min-h-[90svh] md:min-h-screen flex-col justify-center overflow-hidden" ref={ref}>
        {/* BACKDROP */}
        <motion.div
          initial={{ scale: 1.02, opacity: 0.95 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'tween', duration: BG_DUR, delay: BG_DELAY, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 will-change-transform transform-gpu pointer-events-none"
          aria-hidden
        >
          <video
            ref={heroRef}
            className="absolute inset-0 h-full w-full object-cover object-[center_45%] sm:object-[center_35%] bg-black"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {fallback && (
            <Image
              src="/teaser/teaser1.svg"
              alt="Fallback"
              fill
              priority
              className="object-cover object-[center_45%] sm:object-[center_35%]"
              sizes="100vw"
            />
          )}
        </motion.div>

        {/* OVERLAYS */}
        {/* Overlay global mais leve no mobile */}
        <div className="absolute inset-0 z-10 bg-black/10 sm:bg-black/20" />
        {/* Gradiente MENOR no mobile, maior no desktop */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[70%] sm:w-[55%] bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* CONTEÚDO — compacto no mobile, normal no desktop */}
        <motion.div
          className="relative z-20 mr-auto w-full sm:max-w-3xl md:max-w-2xl px-4 sm:px-6 md:pl-28 text-white text-center sm:text-left
                    mt-auto mb-24 sm:mb-44"   // 👈 empurra para o final e dá respiro da onda
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <motion.span
            className="block text-xl sm:text-4xl md:text-5xl font-extralight leading-tight"
            variants={fadeUp()}
          >
            Transformamos o seu sonho em um momento inesquecível com <br />
            <span className="inline-block align-top">
              <MorphingWords />
            </span>
          </motion.span>

          {/* Parágrafo some no mobile, aparece a partir de sm */}
          <motion.p
            className="hidden sm:block mt-4 text-base md:text-lg font-light opacity-95"
            variants={fadeUp(0.05)}
          >
            Transforme o seu grande dia em uma experiência inesquecível com uma assessoria que cuida de cada detalhe com sofisticação e amor.
          </motion.p>

          <motion.div variants={fadeUp(0.1)}>
            <Link href="#contact" onClick={(e) => handleNav(e, 'contato')}>
              <Button className="mt-6 sm:mt-7 rounded-full px-4 py-4 sm:px-5 sm:py-6 text-xs sm:text-base bg-gold-500 text-white hover:bg-gold-600">
                QUERO MEU ORÇAMENTO PERSONALIZADO
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Onda + seta */}
        <div className="absolute bottom-0 z-20 w-full overflow-hidden">
          <svg
            className="h-24 sm:h-32 w-full text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#fff" />
          </svg>

          <motion.div
            className="flex -mt-6 sm:-mt-8 justify-center"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'tween', duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArrowDown className="h-7 w-7 sm:h-8 sm:w-8 animate-bounce" style={{ color: '#153b3d' }} />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
