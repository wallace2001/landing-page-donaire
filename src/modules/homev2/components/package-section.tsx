'use client'

import { Button } from '@/components/ui/button'
import { Variants, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

type Pkg = {
  id: string
  title: string
  thumb: string
  price?: number | null // pode ser undefined/null -> mostra "Sob consulta"
  installment?: { n: number; value: number }
  features: string[]
  notes?: string[]
}

const ACCENT = 'from-[#F5BC7B] to-[#E08B5B]'

const PACKAGES: Pkg[] = [
  {
    id: 'completa',
    title: 'Assessoria Completa',
    thumb: '/casamentos/casamento2.jpeg',
    price: 9999,
    features: [
      'Definição do perfil dos noivos e paleta de cores',
      'Criação da identidade visual do evento',
      'Planejamento detalhado e organização da agenda',
      'Mentoria financeira',
      'Pesquisa, indicação e negociação com fornecedores',
      'Revisão de contratos e controle do que foi fechado',
      'Acompanhamento em degustações e escolha de trajes',
      'Reuniões semanais por videoconferência e tira-dúvidas',
      'Orientação para site dos noivos e confirmação de presença',
      'Acompanhamento em prévias/ensaios e visitas técnicas',
      'Cerimonial completo no dia (alinhamento e supervisão de fornecedores)',
      'Recepção de convidados e coordenação da cerimônia/recepção',
      'Coordenação de momentos especiais (valsa, bolo, etc.)',
      'Relatório final pós-evento',
    ],
    notes: ['Formato: Online + Presencial + Cerimonial'],
  },
  {
    id: 'parcial',
    title: 'Assessoria Parcial Online',
    thumb: '/casamentos/casamento3.jpeg',
    price: 6500,
    features: [
      'Orientação para fechamento de serviços',
      'Indicação de fornecedores',
      'Reuniões semanais por videoconferência e tira-dúvidas',
      'Planejamento do evento e mentoria financeira online',
      'Organização da agenda e agendamento de degustações',
      'Orientação para paleta de cores e identidade visual',
      'Confirmação de presença dos convidados',
      'Acompanhamento em prévias',
      'Cerimonial completo no dia',
    ],
    notes: ['Formato: Online + Cerimonial'],
  },
  {
    id: 'final',
    title: 'Assessoria Final',
    thumb: '/casamentos/casamento4.jpeg',
    price: 4500,
    features: [
      'Alinhamento com fornecedores (30 dias antes)',
      'Planejamento detalhado da cerimônia e recepção',
      'Ensaio do cortejo e briefing do dia',
      'Acompanhamento da montagem da decoração',
      'Conferência de cardápio, bebidas e buffet; recebimento de doces',
      'Supervisão de todos os fornecedores',
      'Recepção de convidados e etiquetagem de presentes',
      'Coordenação de momentos (valsa, bolo, primeira dança, etc.)',
      'Distribuição de lembrancinhas e adereços da pista',
      'Atendimento a emergências; supervisão de higiene e segurança',
      'Relatório final pós-evento',
    ],
    notes: ['Formato: Cerimonial'],
  },
]

const brl = (v?: number) => {
  if (!v) return 0;
  return v.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}


const gridV: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.3 } },
}

const cardV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const itemV: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}


function goToContact(pkgTitle?: string) {
  const params = new URLSearchParams(window.location.search)
  if (pkgTitle) params.set('pkg', pkgTitle)
  else params.delete('pkg')

  const qs = params.toString()
  const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}#contato`
  history.replaceState(null, '', newUrl)

  // rola até a seção compensando o header
  const el = document.getElementById('contato')
  const header = document.querySelector('header') as HTMLElement | null
  const offset = (header?.offsetHeight ?? 0) + 8
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // toast de sucesso
  toast.info('Pacote selecionado!', {
    description:
      pkgTitle
        ? `Selecionamos “${pkgTitle}”. Preencha os campos para falar com a gente pelo WhatsApp.`
        : 'Preencha os campos para falar com a gente pelo WhatsApp.',
    duration: 4000,
  })
}


export function PackagesSection() {
  return (
    <section id="pacotes" className="w-full bg-[#122d2f] px-6 pt-12 pb-24 sm:px-12 md:px-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-10 text-2xl font-extrabold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          Nossos{' '}
          <span className={`bg-gradient-to-r ${ACCENT} bg-clip-text text-transparent`}>Pacotes</span>
        </motion.h2>

        <motion.div
          variants={gridV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          {PACKAGES.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  const hasPrice = typeof pkg.price === 'number' && pkg.price! > 0

  return (
    <motion.div
      variants={cardV}
      whileHover={{ y: -2 }}
      transition={{ type: 'tween', duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur-sm md:p-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr_220px] md:items-center">
        {/* thumb */}
        <div className="overflow-hidden rounded-xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={pkg.thumb}
              alt={pkg.title}
              width={1920}
              height={1080}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* conteúdo */}
        <div>
          <h3 className="mb-3 text-xl font-extrabold text-white md:text-2xl">{pkg.title}</h3>
          <motion.ul variants={{ show: { transition: { staggerChildren: 0.3 } } }} initial={false} animate="show" className="space-y-2">
            {pkg.features.map((f, i) => (
              <motion.li key={i} variants={itemV} className="flex items-start gap-3 text-base text-white/90">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                  <Check className="h-4 w-4 text-white" />
                </span>
                <span>{f}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* preço / notas / CTA */}
        <div className="md:pl-6">
          <div className="text-right">
            <div className="text-3xl font-extrabold leading-none text-white">
              {hasPrice ? brl(pkg.price!) : 'Sob consulta'}
            </div>
            {hasPrice && pkg.installment && (
              <div className="mt-1 text-sm text-white/70">
                ou {pkg.installment.n}x {brl(pkg.installment.value)}
              </div>
            )}
          </div>

          <div className={`my-4 h-[2px] w-full rounded bg-gradient-to-r ${ACCENT}`} />

          {pkg.notes && (
            <div className="space-y-1 text-right text-sm text-white/80 mb-3">
              {pkg.notes.map((n, i) => (
                <p key={i}>{n}</p>
              ))}
            </div>
          )}

          <Button
            className="w-full bg-white text-[#122d2f] hover:bg-white/90"
            onClick={() => goToContact(pkg.title)}
          >
            Solicitar proposta
          </Button>

        </div>
      </div>
    </motion.div>
  )
}
