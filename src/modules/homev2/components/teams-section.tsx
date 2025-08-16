'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Jéssica Lima',
    role: 'CEO & Fundadora',
    image: '/images/avatar1.jpg',
    description: `Fundadora e mente estratégica da Donaire. Com mais de 10 anos de experiência em grandes mercados, Jéssica é especialista em diagnosticar desafios e traçar os caminhos mais eficazes para o crescimento de uma marca. Sua paixão é transformar sonhos complexos em celebrações claras e poderosas que geram resultados emocionais concretos para cada casal.`,
  },
  {
    name: 'Cris Basílio',
    role: 'Diretora comercial',
    image: '/images/avatar2.jpg',
    description: `Visionária por trás dos conceitos mais inovadores da Donaire. Cris combina sensibilidade artística com expertise técnica para criar experiências visuais que transcendem o comum. Sua abordagem única transforma cada casamento em uma obra de arte personalizada, onde cada detalhe conta uma história única e emocionante.`,
  },
    {
    name: 'Karêm Thássia',
    role: 'Diretora de Operações',
    image: '/images/avatar3.jpg',
    description: `A força organizacional que garante a execução impecável de cada projeto. Karêm Thássia é especialista em logística complexa e gestão de fornecedores, assegurando que cada casamento aconteça sem falhas. Sua atenção aos detalhes e capacidade de antever desafios fazem dela a guardiã da qualidade e pontualidade que define a Donaire.`,
  },
  {
    name: 'Jeferson',
    role: 'Especialista em Relacionamento',
    image: '/images/avatar4.jpg',
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
      {/* Cabeçalho com entrada suave no scroll */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
      >
        <motion.h2
          className="text-3xl text-[var(--april-400)] tracking-wide mb-2"
          variants={fadeUp()}
        >
          Conheça a Equipe
        </motion.h2>
        <motion.p
          className="text-md text-[var(--april-500)]"
          variants={fadeUp(0.2)}
        >
          Profissionais dedicados para tornar seu dia inesquecível.
        </motion.p>
      </motion.div>

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