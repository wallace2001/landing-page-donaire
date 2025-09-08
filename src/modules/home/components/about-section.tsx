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

// Troque por seu endereço exato, se quiser:
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.280605492757!2d-47.885932424835644!3d-15.789151284850508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3b02a101f8c1%3A0x3925e510f4280f0f!2sEdif%C3%ADcio%20Number%20One!5e0!3m2!1spt-BR!2sbr!4v1757371045159!5m2!1spt-BR!2sbr';

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
          <YouTubePlayer videoId="U0ViLgdRYPM" />
        </motion.div>
      </div>

      {/* Bloco de texto */}
      <motion.div
        className="max-w-6xl mx-auto mt-12 space-y-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.h2 className="text-xl md:text-3xl leading-relaxed" variants={fadeUp(0.3)}>
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

      {/* Métricas */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 text-center gap-8 mt-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.div variants={fadeUp(0.4)}>
          <p className="text-5xl">+10</p>
          <p className="text-lg text-[#1f6568]">Anos de experiência</p>
        </motion.div>

        <motion.div variants={fadeUp(0.45)}>
          <p className="text-5xl">Atendemos</p>
          <p className="text-lg text-[#1f6568]">Brasília, Goiás e Tocantins</p>
        </motion.div>
      </motion.div>

      {/* Mapa do Google */}
      <motion.div
        className="max-w-6xl mx-auto mt-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp(0.2)}
      >
        <h3 className="text-2xl font-semibold mb-4">Onde estamos</h3>
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#1f6568]/20 shadow">
          {/* Aspect ratio responsivo */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
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
        {/* Dica para rota no Maps */}
        <div className="mt-3 text-sm">
          <a
            href="https://www.google.com/maps/place/Edif%C3%ADcio+Number+One/@-15.7891513,-47.8859324,17z/data=!3m1!4b1!4m6!3m5!1s0x935a3b02a101f8c1:0x3925e510f4280f0f!8m2!3d-15.7891513!4d-47.8833575!16s%2Fg%2F1tyt6fc0?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            Ver rota no Google Maps
          </a>
        </div>
      </motion.div>
    </section>
  )
}
