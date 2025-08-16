'use client'

import YouTubePlayer from '@/components/youtube-player'
import { motion, Variants } from 'framer-motion'

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

export default function SobreNosDonaire() {
  return (
    <section id="sobre" className="bg-white text-[#1f6568] py-16 px-6 md:px-24">
      <motion.h1
        className="text-center text-5xl mb-10 mt-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0.2)}
      >
        Sobre <span className="font-bold text-[#1f6568]">nós</span>
      </motion.h1>
      <div className="max-w-6xl mx-auto mt-12 space-y-8">
        <motion.div
          className="rounded-lg overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp(0.3)}
        >
          <YouTubePlayer
            videoId='U0ViLgdRYPM'
          />
        </motion.div>
      </div>
      {/* Bloco de texto (continua igual) */}
      <motion.div
        className="max-w-6xl mx-auto mt-12 space-y-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.h2
          className="text-xl md:text-3xl font-light leading-relaxed"
          variants={fadeUp(0.3)}
        >
          NÓS SOMOS <span className="font-bold text-[#1f6568]">APAIXONADOS</span> POR TORNAR REALIDADE
          OS MELHORES CASAMENTOS, COM ANOS DE <span className="font-bold text-[#1f6568]">EXPERIÊNCIA</span> E UM
          <span className="font-bold text-[#1f6568]"> PORTFÓLIO</span> DE CELEBRAÇÕES INESQUECÍVEIS.
        </motion.h2>

        <motion.div className="text-md text-[#1f6568] space-y-4" variants={fadeUp(0.4)}>
          <p>
            Transformar sonhos em realidade: a <strong className="text-[#1f6568]">Donaire Cerimonial</strong> é sua parceira
            para criar casamentos memoráveis. Com paixão por excelência, criatividade e
            atenção aos detalhes, damos vida à sua visão.
          </p>
          <p>
            De locais deslumbrantes a detalhes impecáveis, nossa equipe garante que o seu
            grande dia reflita a história de amor do casal com leveza, planejamento e muito carinho.
          </p>
        </motion.div>

        <motion.div variants={fadeUp(0.5)}>
          <p className="italic text-sm mt-6">Com carinho,</p>
          <p className="text-base font-signature">Jéssica Lima</p>
        </motion.div>
      </motion.div>

      {/* Métricas (mantidas) */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-8 mt-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.div variants={fadeUp(0.4)}>
          <p className="text-5xl">250+</p>
          <p className="text-lg text-[#1f6568]">Casais Atendidos</p>
        </motion.div>
        <motion.div variants={fadeUp(0.45)}>
          <p className="text-5xl">15+</p>
          <p className="text-lg text-[#1f6568]">Especialistas</p>
        </motion.div>
        <motion.div variants={fadeUp(0.5)}>
          <p className="text-5xl">90%</p>
          <p className="text-lg text-[#1f6568]">Satisfação</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
