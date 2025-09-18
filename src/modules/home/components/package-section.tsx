'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useQuoteStore } from '@/modules/store/quote-store'
import { motion, MotionConfig, Variants } from 'framer-motion'
import { Check, Crown, Star, Trophy } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

type Installment = { n: number; value: number }
type Pkg = {
  id: 'grace' | 'posture' | 'elegance' | 'personalizado'
  tierLabel: string
  title: string
  subtitle?: string
  thumb: string
  price?: number | null
  installment?: Installment
  features: string[]
  notes?: string[]
  highlight?: 'bestseller' | 'vip'
}

const ACCENT = 'from-[#F5BC7B] to-[#E08B5B]'
const BG = '#122d2f'

// ===== helpers
const brl = (v?: number | null) =>
  (typeof v === 'number' ? v : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const calcInstallment = (price?: number | null, n = 12): Installment | undefined =>
  typeof price === 'number' && price > 0 ? { n, value: Math.ceil((price / n) * 100) / 100 } : undefined

// ===== animations
const gridV: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const cardV: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }
const itemV: Variants = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.35 } } }

// ===== data (use os seus pacotes oficiais)
const OFFICIAL_PACKAGES: Pkg[] = [
  {
    id: 'grace',
    tierLabel: 'GRACE',
    title: 'Assessoria Final',
    thumb: '/casamentos/casamento4.svg',
    price: null,
    installment: calcInstallment(4697, 12),
    features: [
      'Acompanhamento on-line e reunião de alinhamento (≈50 dias antes)',
      'Levantamento de contratos e conferência técnica/logística',
      'Contato com fornecedores e alinhamento final (semana do evento)',
      'Roteiro completo do evento',
      'Ensaio na semana do evento',
      'Acompanhamento de montagem e gestão de imprevistos',
      'Coordenação integral no dia do casamento',
    ],
    notes: ['Formato: Cerimonial + Preparação final'],
  },
  {
    id: 'posture',
    tierLabel: 'POSTURE',
    title: 'Assessoria Completa',
    thumb: '/casamentos/casamento2.svg',
    price: null,
    installment: calcInstallment(6997, 12),
    features: [
      'Acompanhamento online e parcialmente presencial',
      'Indicação e acompanhamento de fornecedores',
      'Suporte em negociação e fechamento de contratos',
      'Reuniões de alinhamento mensais',
      'Levantamento de contratos + conferência técnica / logística',
      'Alinhamento final com fornecedores (semana do evento)',
      'Roteiro completo + ensaio na semana do evento',
      'Acompanhamento da montagem + gestão de imprevistos',
      'Coordenação integral no dia do casamento',
    ],
    notes: ['Formato: Online + Presencial + Cerimonial'],
    highlight: 'bestseller',
  },
  {
    id: 'elegance',
    tierLabel: 'ELEGANCE',
    title: 'Assessoria VIP',
    subtitle: 'Completa VIP',
    thumb: '/casamentos/casamento3.svg',
    price: null,
    installment: calcInstallment(9997, 12),
    features: [
      'Consultoria do pré ao pós-evento',
      'Planejamento orçamentário + controle financeiro',
      'Pesquisa/seleção de fornecedores + acompanhamento em reuniões e degustações',
      'Análise e negociação de contratos (segurança jurídica/financeira)',
      'Gestão completa do cronograma + alinhamentos estratégicos',
      'Planejamento e logística detalhados (cerimônia e recepção)',
      'Roteiros técnicos de montagem / cerimônia / recepção / desmontagem',
      'Reuniões semanais de acompanhamento',
      'Coordenação integral no dia, equipe dedicada ao casal/família',
      'Atendimento VIP e suporte exclusivo em cada etapa',
      'Acompanhamento de montagem + relatório pós-evento',
    ],
    notes: ['Formato: Premium completo + VIP'],
    highlight: 'vip',
  },
]

const PERSONALIZADO: Pkg = {
  id: 'personalizado',
  tierLabel: 'CUSTOM',
  title: 'Pacote Personalizado',
  thumb: '/casamentos/casamento1.svg',
  price: null,
  features: [
      'Consultoria do pré ao pós-evento',
      'Planejamento orçamentário + controle financeiro',
      'Pesquisa/seleção de fornecedores + acompanhamento em reuniões e degustações',
      'Análise e negociação de contratos (segurança jurídica/financeira)',
      'Gestão completa do cronograma + alinhamentos estratégicos',
      'Planejamento e logística detalhados (cerimônia e recepção)',
      'Roteiros técnicos de montagem / cerimônia / recepção / desmontagem',
      'Reuniões semanais de acompanhamento',
      'Coordenação integral no dia, equipe dedicada ao casal/família',
      'Atendimento VIP e suporte exclusivo em cada etapa',
      'Acompanhamento de montagem + relatório pós-evento',
  ],
  notes: ['Selecione os itens e receba a proposta final'],
}

// ===== UI bits
function Badge({ type }: { type: 'bestseller' | 'vip' }) {
  if (type === 'vip') {
    return (
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
        <Crown className="h-3.5 w-3.5 text-yellow-400" /> VIP
      </div>
    )
  }
  return (
    <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs text-[#111] shadow">
      <Trophy className="h-3.5 w-3.5 text-amber-600" /> Mais escolhido
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <motion.li variants={itemV} className="flex items-start gap-3 text-[15px] text-white/90">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 shrink-0">
        <Check className="h-4 w-4 text-white" />
      </span>
      <span className="min-w-0 break-words">{text}</span>
    </motion.li>
  )
}

function PriceBlock({ price, installment }: { price?: number | null; installment?: Installment }) {
  const has = typeof price === 'number' && price > 0
  return (
    <div className="text-center sm:text-right">
      <div className="text-[clamp(20px,2.6vw,32px)] font-extrabold leading-none text-white">
        {has ? brl(price) : 'Sob consulta'}
      </div>
      {has && installment && (
        <div className="mt-1 text-sm text-white/75">
          ou {installment.n}x {brl(installment.value)}
        </div>
      )}
    </div>
  )
}

// ===== scroll helper
function scrollToContact() {
  const el = document.getElementById('contato')
  const header = document.querySelector('header') as HTMLElement | null
  const offset = (header?.offsetHeight ?? 0) + 8
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// ===== Card VERTICAL (novo layout)
function PackageCard({
  pkg,
  personalizedSelected,
  onPersonalToggle,
  onSelectFixed,
}: {
  pkg: Pkg
  personalizedSelected?: string[]
  onPersonalToggle?: (f: string) => void
  onSelectFixed?: () => void
}) {
  const isPersonalizado = pkg.id === 'personalizado'
  const hasBadge = pkg.highlight === 'bestseller' || pkg.highlight === 'vip'

  return (
    <motion.div
      variants={cardV}
      whileHover={{ y: -3 }}
      transition={{ type: 'tween', duration: 0.35 }}
      className={[
        // container
        'group relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl',
        'border border-white/10 bg-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_10px_26px_rgba(0,0,0,0.18)]',
        'backdrop-blur-md isolate',
      ].join(' ')}
    >
      {/* badge */}
      {hasBadge && <Badge type={pkg.highlight as 'bestseller' | 'vip'} />}

      {/* capa */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={pkg.thumb}
          alt={pkg.title}
          fill
          className="object-cover"
          sizes="(min-width:1280px) 420px, (min-width:768px) 50vw, 100vw"
          priority
        />
        {/* overlay sutil + borda arredondada */}
        <div className="absolute inset-0 ring-1 ring-white/10"></div>
      </div>

      {/* header */}
      <div className="px-5 pt-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/85">
            {pkg.tierLabel}
          </span>
          {pkg.subtitle && <span className="text-xs text-white/70">{pkg.subtitle}</span>}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-[clamp(18px,2.6vw,22px)] font-semibold text-white">{pkg.title}</h3>
          {!isPersonalizado && <PriceBlock price={pkg.price} installment={pkg.installment} />}
        </div>
      </div>

      {/* divider */}
      <div className={`mx-5 my-4 h-[2px] rounded bg-gradient-to-r ${ACCENT}`} />

      {/* lista de features (cresce e pode rolar se necessário) */}
      <motion.ul
        variants={{ show: { transition: { staggerChildren: 0.18 } } }}
        initial={false}
        animate="show"
        className="mx-5 flex-1 space-y-2 overflow-hidden"
      >
        <div className="max-h-[260px] overflow-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent]">
          {pkg.features.map((f, i) => (
            <div key={i} className="flex items-start">
              {isPersonalizado ? (
                <label className="flex cursor-pointer select-none items-start gap-3 text-white/90">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#E08B5B] shrink-0"
                    checked={personalizedSelected?.includes(f) ?? false}
                    onChange={() => onPersonalToggle?.(f)}
                    aria-label={`Selecionar serviço: ${f}`}
                  />
                  <span className="text-[15px] break-words">{f}</span>
                </label>
              ) : (
                <FeatureItem text={f} />
              )}
            </div>
          ))}
        </div>
      </motion.ul>

      {/* notas */}
      {pkg.notes && (
        <div className="mx-5 mt-3 text-right text-xs text-white/75">
          {pkg.notes.map((n, i) => (
            <p key={i} className="break-words">{n}</p>
          ))}
        </div>
      )}

      {/* CTA fixado ao rodapé do card */}
      <div className="mt-5 px-5 pb-5">
        <Button
          className="w-full bg-white text-[#122d2f] hover:bg-white/90"
          onClick={() => {
            if (isPersonalizado) {
              if (!personalizedSelected?.length) return toast.warning('Selecione pelo menos 1 serviço.')
              toast.info('Pacote selecionado!', { description: 'Personalizado marcado. Revise no formulário.', duration: 2500 })
              scrollToContact()
            } else {
              onSelectFixed?.()
            }
          }}
          disabled={isPersonalizado && !personalizedSelected?.length}
        >
          {isPersonalizado ? 'Montar meu pacote' : 'Solicitar proposta'}
        </Button>
      </div>
    </motion.div>
  )
}

// ===== Section
export function PackagesSection() {
  const { setPackage, toggleService, clearServices, selectedPackage, selectedServices } = useQuoteStore()
  const [personalSelected, setPersonalSelected] = useState<string[]>([])
  const packages = useMemo(() => [...OFFICIAL_PACKAGES, PERSONALIZADO], [])

  useEffect(() => {
    if (selectedPackage === 'Pacote Personalizado') setPersonalSelected(selectedServices)
  }, [selectedPackage, selectedServices])

  const selectFixedPackage = (title: string) => {
    setPackage(title)
    clearServices()
    toast.info('Pacote selecionado!', { description: `Selecionamos “${title}”.`, duration: 2500 })
    scrollToContact()
  }

  const onTogglePersonalizado = (f: string) => {
    if (selectedPackage !== 'Pacote Personalizado') {
      setPackage('Pacote Personalizado')
      clearServices()
      setPersonalSelected([f])
      toggleService(f)
    } else {
      setPersonalSelected(prev => (prev.includes(f) ? prev.filter(s => s !== f) : [...prev, f]))
      toggleService(f)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <section id="pacotes" className="w-full" style={{ backgroundColor: BG }}>
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 sm:px-8 md:px-12">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
          <h2 className="mb-10 text-2xl font-extrabold tracking-tight text-white md:text-4xl">
            Nossos{' '}
            <span className="bg-gradient-to-r from-[#F5BC7B] to-[#E08B5B] bg-clip-text text-transparent">
              Pacotes
            </span>
          </h2>
            <p className="text-sm text-white/80">
              Escolha o nível de acompanhamento ideal — do suporte final ao atendimento VIP do início ao fim.
            </p>
          </motion.div>

          {/* faixa de confiança */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">+60 avaliações no Casamentos.com.br</span>
            </div>
            <div className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="text-xs">Equipe dedicada · Planejamento financeiro · Roteiros técnicos</span>
          </div>

          {/* GRID: auto-fit vertical cards */}
          <motion.div
            variants={gridV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.06 }}
            className="mt-10 grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-7 lg:gap-8"
          >
            {packages.map(pkg => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                personalizedSelected={personalSelected}
                onPersonalToggle={onTogglePersonalizado}
                onSelectFixed={() => selectFixedPackage(`${pkg.tierLabel} — ${pkg.title}`)}
              />
            ))}
          </motion.div>

          {/* Comparativo compacto (desktop) */}
          <div className="mt-14 hidden md:block rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-white text-[clamp(16px,2vw,20px)] font-semibold mb-4">Comparativo rápido</h3>
            <div className="grid grid-cols-3 gap-6 text-sm text-white/85">
              <Card className="bg-transparent border-white/10 p-4">
                <p className="font-semibold">GRACE — Final</p>
                <p className="mt-1">Reta final + ensaio + roteiro + dia do evento</p>
              </Card>
              <Card className="bg-transparent border-white/10 p-4">
                <p className="font-semibold">POSTURE — Completa</p>
                <p className="mt-1">Percurso completo, fornecedores, reuniões mensais, dia do evento</p>
              </Card>
              <Card className="bg-transparent border-white/10 p-4">
                <p className="font-semibold">ELEGANCE — VIP</p>
                <p className="mt-1">Consultoria total + financeiro, reuniões semanais, equipe dedicada</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}