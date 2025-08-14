'use client'

import Image from 'next/image'

const team = [
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

export default function TeamSection() {
  return (
    <section className="bg-olive-500 text-white px-6 md:px-12 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossa Equipe</h2>
        <p className="uppercase text-gold-500 text-sm md:text-base font-semibold tracking-wide leading-relaxed">
          Nossa equipe é formada por profissionais altamente capacitados. Ao longo dos anos, desenvolvemos um método de trabalho que nos permite padronizar a qualidade dos nossos serviços de modo a entregar filmes realmente inesquecíveis.
        </p>
      </div>

      <div className="flex flex-col gap-10 max-w-5xl mx-auto">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center bg-[--color-dark-700] rounded-2xl p-6 shadow-lg gap-6"
          >
            <div className="w-40 h-40 min-w-[160px] rounded-full overflow-hidden border border-mint-500">
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="object-cover"
              />
            </div>

            <div className="text-left text-white/90">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-gold-500 font-semibold mb-2">{member.role}</p>
              <p className="text-sm leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
