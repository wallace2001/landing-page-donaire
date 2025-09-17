'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Jéssica Lima',
    role: 'Responsável pela gestão da equipe e do evento',
    image: '/images/avatar1.svg',
    description: `Fundadora e mente estratégica da Donaire. Com mais de 10 anos de experiência em grandes mercados, Jéssica é especialista em diagnosticar desafios e traçar os caminhos mais eficazes para o crescimento de uma marca. Sua paixão é transformar sonhos complexos em celebrações claras e poderosas que geram resultados emocionais concretos para cada casal.`,
  },
  {
    name: 'Cris Basílio',
    role: 'Responsável pelo atendimento',
    image: '/images/avatar2.svg',
    description: `Visionária por trás dos conceitos mais inovadores da Donaire. Cris combina sensibilidade artística com expertise técnica para criar experiências visuais que transcendem o comum. Sua abordagem única transforma cada casamento em uma obra de arte personalizada, onde cada detalhe conta uma história única e emocionante.`,
  },
    {
    name: 'Karêm Thássia',
    role: 'Diretora de Operações',
    image: '/images/avatar3.svg',
    description: `A força organizacional que garante a execução impecável de cada projeto. Karêm Thássia é especialista em logística complexa e gestão de fornecedores, assegurando que cada casamento aconteça sem falhas. Sua atenção aos detalhes e capacidade de antever desafios fazem dela a guardiã da qualidade e pontualidade que define a Donaire.`,
  },
  {
    name: 'Jeferson',
    role: 'Cerimoniário Especialista em eventos Cristãos',
    image: '/images/avatar4.svg',
    description: `Ana Carolina é responsável por criar conexões genuínas com cada casal. Sua habilidade em compreender sonhos e transformá-los em realidade faz dela a ponte perfeita entre as expectativas dos clientes e a execução da equipe. Cada conversa com Ana é um passo mais próximo do casamento dos sonhos.`,
  },
]

// Variantes tipadas
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier suave
    },
  },
})

export default function TeamSection() {
  return (
    <section id="equipe" className="relative bg-[#f9f6f3] py-20 px-6 sm:px-12 md:px-24">
          {/* Cabeçalho */}
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={container}
            className="text-center mb-12"
          >
            <h2
              id="team-heading"
              className="text-[clamp(22px,4.5vw,36px)] font-light tracking-tight text-[var(--april-400)]"
            >
              Conheça a <span className="font-semibold">Equipe</span>
            </h2>
            <motion.p
              variants={fadeUp(0.15)}
              className="mt-2 text-[clamp(14px,2.2vw,16px)] text-[var(--april-500)]"
            >
              Profissionais dedicados para tornar seu dia inesquecível.
            </motion.p>
            <div className="mx-auto mt-5 h-[3px] w-24 rounded-full bg-[var(--april-400)]/15" />
          </motion.header>
      {/* Grid: anima ao entrar na viewport + stagger */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className="flex flex-col items-center text-center"
            variants={fadeUp(index * 0.2)} // leve delay progressivo por card
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <motion.div
              className="w-56 h-72 bg-[#f0ebe6] rounded-t-full relative overflow-hidden"
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                priority
              />
            </motion.div>

            <motion.p
              className="mt-6 text-sm text-[var(--april-500)]"
              variants={fadeUp(0.2)}
            >
              {member.role}
            </motion.p>

            <motion.h3
              className="text-lg font-serif font-medium tracking-wide text-[var(--april-400)]"
              variants={fadeUp(0.4)}
            >
              {member.name}
            </motion.h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}