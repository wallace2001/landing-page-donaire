'use client'

import { motion, type Variants } from 'framer-motion'
import { ServiceCard } from './service-card'

const listContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
}

const listItem = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  },
})

export function ServicesSection() {
  return (
    <section id="depoimentos" className="w-full bg-[#122d2f] py-20 px-6 md:px-40 pt-40">
        <h2 className="mb-32 text-2xl font-extrabold tracking-tight text-white md:text-4xl">
          Nossos{' '}
          <span className="bg-gradient-to-r from-[#F5BC7B] to-[#E08B5B] bg-clip-text text-transparent">
            Depoimentos
          </span>
        </h2>
      <motion.div
        className="max-w-7xl mx-auto flex flex-col gap-32"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={listContainer}
      >
        <motion.div variants={listItem(0)}>
          <ServiceCard
            title="Liene & Nonato"
            description="Gostaríamos de expressar nossa mais profunda gratidão pelo cuidado, dedicação e profissionalismo que conduziu cada detalhe do nosso grande dia. Desde o primeiro contato, pudemos sentir a segurança e o carinho com que vocês abraçaram nosso sonho. Cada detalhe refletiu não só a competência, mas também o zelo que vocês colocam em tudo o que fazem. Vocês fazem muito mais do que organizar casamentos, vocês realizam sonhos!"
            image="/casamentos/ANDR1232.jpeg"
            local="Brasília"
            date="Dezembro 2024"
          />
        </motion.div>

        <motion.div variants={listItem(1)}>
          <ServiceCard
            title="Giovana & Eduardo"
            description="Muito obrigada pelo apoio de vocês durante todo essa caminhada de quase 2 anos para a preparação deste dia. Vocês nos ajudaram muito e continuamos contando com o apoio de vocês hoje! Que Deus minimize cada obstáculo e abençoe esse dia tão especial para nós. Vocês são maravilhosos!"
            image="/casamentos/061A1976.jpeg"
            local="Brasília"
            date="Dezembro 2024"
            reverse
          />
        </motion.div>

        <motion.div variants={listItem(2)}>
          <ServiceCard
            title="Duda & Kauã"
            description="Como foi lindo e especial o nosso dia!! Jessica, sem palavras pra descrever o QUÃO importante foi ter uma amiga em fé como nossa cerimonialista e assessora! Quantas orações recebemos, quantas palavras do Senhor e quanto cuidado de Deus recebemos através de você e da sua equipe."
            local="Brasília"
            date="Dezembro 2024"
            image="/casamentos/D&D-79.jpeg"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
