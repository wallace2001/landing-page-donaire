'use client'

import { MorphingWords } from '@/components/morphing-words'
import { Button } from '@/components/ui/button'
import { motion, MotionConfig, type Variants } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

// ====== Tempos (pode deixar grandes) ======
const ENTER_DUR = 0.9;      // duração do fade/slide
const STAGGER = 0.12;       // atraso entre elementos
const BG_DUR = 2.2;         // zoom-out do banner (pode aumentar)
const BG_DELAY = 0.15;      // atraso do zoom-out

// Variantes
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: STAGGER }
  }
}

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { type: 'tween', duration: ENTER_DUR, delay, ease: [0.16, 1, 0.3, 1] }
  }
})

export default function HeroV2() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* BG com leve zoom-out cinematográfico */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'tween', duration: BG_DUR, delay: BG_DELAY, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 will-change-transform transform-gpu"
        >
          <Image
            src="/images/hero-banner-principal.jpg"
            alt="Casal se casando"
            fill
            className="absolute inset-0 object-cover"
            priority
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Conteúdo */}
        <motion.div
          className="relative z-20 px-4 max-w-4xl text-white"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <motion.span
            className="block text-3xl sm:text-5xl md:text-6xl font-extralight leading-tight"
            variants={fadeUp()}
          >
            Transformamos o seu sonho em um evento inesquecível com <br />
            <span className="inline-block align-top">
              <MorphingWords />
            </span>
          </motion.span>

          <motion.p
            className="mt-4 text-base md:text-lg font-light"
            variants={fadeUp(0.05)}
          >
            Transforme o seu grande dia em uma experiência inesquecível com uma assessoria que cuida de cada detalhe com sofisticação e amor.
          </motion.p>

          <motion.div variants={fadeUp(0.1)}>
            <Button className="mt-8 rounded-full text-md px-10 py-8 bg-gold-500 text-white hover:bg-gold-600">
              Quero meu orçamento personalizado
            </Button>
          </motion.div>
        </motion.div>

        {/* Onda + seta */}
        <div className="absolute bottom-0 w-full z-20 overflow-hidden">
          <svg
            className="w-full h-32 text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
              fill="#fff"
            />
          </svg>

          <motion.div
            className="flex justify-center -mt-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'tween', duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArrowDown className="w-8 h-8 animate-bounce" style={{ color: '#153b3d' }} />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
