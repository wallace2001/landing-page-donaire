'use client'

import YouTubePlayer from '@/components/youtube-player'
import { motion, MotionConfig, Variants } from 'framer-motion'

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

// Troque pelo endereço exato da sua sede, se quiser
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.280605492757!2d-47.885932424835644!3d-15.789151284850508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3b02a101f8c1%3A0x3925e510f4280f0f!2sEdif%C3%ADcio%20Number%20One!5e0!3m2!1spt-BR!2sbr!4v1757371045159!5m2!1spt-BR!2sbr';

export default function SobreNosDonaire() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="sobre" className="bg-white text-[#1f6568]">
        {/* container principal */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          {/* Headline */}
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp(0.15)}
            className="text-center"
          >
            <h1 className="text-[clamp(28px,5vw,48px)] font-light tracking-tight">
              Sobre <span className="font-semibold text-[#1f6568]">nós</span>
            </h1>

            {/* sublinhado decorativo */}
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#1f6568]/20" />
          </motion.header>

          {/* Grid: vídeo + copy */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Vídeo */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-[#1f6568]/10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp(0.2)}
            >
              <YouTubePlayer videoId="U0ViLgdRYPM" />
            </motion.div>

            {/* Texto */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={container}
              className="space-y-6"
            >
              <motion.h2
                variants={fadeUp(0.25)}
                className="text-[clamp(18px,2.6vw,28px)] leading-relaxed font-light"
              >
                Somos <span className="font-semibold">apaixonados</span> por tornar realidade os melhores casamentos.
                Anos de <span className="font-semibold">experiência</span> e um <span className="font-semibold">portfólio</span> de celebrações inesquecíveis.
              </motion.h2>

              <motion.div variants={fadeUp(0.35)} className="text-[clamp(14px,1.6vw,16px)] space-y-4">
                <p>
                  A <strong className="font-semibold">Donaire Cerimonial</strong> é sua parceira para criar casamentos
                  memoráveis. Com paixão por excelência, criatividade e atenção aos detalhes, damos vida à sua visão.
                </p>
                <p>
                  Do conceito à execução, nossa equipe garante que o seu grande dia reflita a história de amor do casal
                  com leveza, planejamento e muito carinho.
                </p>
              </motion.div>

              <motion.div variants={fadeUp(0.45)} className="pt-2">
                <p className="italic text-sm">Com carinho,</p>
                <p className="text-base font-signature">Jéssica Lima</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Métricas em cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6"
            aria-label="Nossas métricas"
          >
            <motion.div
              variants={fadeUp(0.25)}
              className="rounded-2xl border border-[#1f6568]/15 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 text-center"
            >
              <p className="text-[clamp(32px,6vw,44px)] font-semibold leading-none">+10</p>
              <p className="mt-2 text-[15px]">Anos de experiência</p>
            </motion.div>

            <motion.div
              variants={fadeUp(0.3)}
              className="rounded-2xl border border-[#1f6568]/15 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 text-center"
            >
              <p className="text-[clamp(22px,4.6vw,28px)] font-semibold leading-tight">Atendemos</p>
              <p className="mt-1 text-[15px]">Brasília, Goiás e Tocantins</p>
            </motion.div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(0.2)}
          >
            <h3 className="text-[clamp(20px,2.4vw,26px)] font-semibold">Onde estamos</h3>
            <p className="mt-1 text-sm text-[#1f6568]/80">
              Agendamos atendimentos com hora marcada para acolher seu projeto com calma e atenção.
            </p>

            <div className="mt-5 rounded-2xl overflow-hidden border border-[#1f6568]/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
              {/* Aspect ratio responsivo */}
              <div className="relative w-full aspect-[16/9] lg:aspect-[21/9]">
                <iframe
                  title="Mapa - Donaire Cerimonial"
                  src={MAP_EMBED_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                  aria-label="Mapa com a localização da Donaire Cerimonial"
                />
              </div>
            </div>

            {/* CTA extra para rota */}
            <div className="mt-3 text-sm">
              <a
                href="https://www.google.com/maps/place/Edif%C3%ADcio+Number+One/@-15.7891513,-47.8859324,17z/data=!3m1!4b1!4m6!3m5!1s0x935a3b02a101f8c1:0x3925e510f4280f0f!8m2!3d-15.7891513!4d-47.8833575!16s%2Fg%2F1tyt6fc0?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Ver rota no Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
