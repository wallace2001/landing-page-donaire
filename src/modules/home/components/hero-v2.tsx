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
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'tween', duration: BG_DUR, delay: BG_DELAY, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 will-change-transform transform-gpu pointer-events-none"
          aria-hidden
        >
          <video
            ref={heroRef}
            className="absolute inset-0 h-full w-full object-cover bg-black"
            autoPlay
            muted
            loop
            webkit-playsinline="true"
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
              className="object-contain"
              sizes="100vw"
            />
          )}
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
            <Link href="#contact" onClick={(e) => handleNav(e, 'contato')}>
              <Button className="mt-8 rounded-full px-6 py-8 text-md bg-gold-500 text-white hover:bg-gold-600">
                QUERO MEU ORÇAMENTO PERSOALIZADO
              </Button>
            </Link>
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
