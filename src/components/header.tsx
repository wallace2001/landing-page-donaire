'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { motion, MotionConfig } from 'framer-motion'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'

const LINKS = [
  { id: 'sobre', label: 'SOBRE' },
  { id: 'equipe', label: 'EQUIPE' },
  { id: 'depoimentos', label: 'DEPOIMENTOS' },
  { id: 'trabalhos', label: 'TRABALHOS' },
  { id: 'pacotes', label: 'PACOTES' },
  { id: 'contato', label: 'CONTATO' },
] as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('') // seção visível
  const [sheetOpen, setSheetOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)

  // scroll style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // observar seções para destacar nav
  useEffect(() => {
    const ids = LINKS.map(l => l.id)
    const els = ids
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // pega a mais visível no viewport
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root: null, rootMargin: '-10% 0px -65% 0px', threshold: [0.15, 0.3, 0.6] }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // atualizar var CSS com altura do header — útil pra offsets estáveis
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerH = ref.current ? ref.current.offsetHeight : 0
    const top = el.getBoundingClientRect().top + window.scrollY - headerH
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToId(id)
    history.replaceState(null, '', `#${id}`)
    setSheetOpen(false)
  }

  // classes utilitárias
  const linkClass = (id: string) =>
    cn(
      'relative inline-block transition text-white/90 hover:text-white',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm',
      // underline gradiente no hover/active
      "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r from-[#F5BC7B] to-[#E08B5B] after:transition-[width] after:duration-300",
      (active === id) && "text-white after:w-full",
      (active !== id) && "hover:after:w-full"
    )

  return (
    <MotionConfig reducedMotion="user">
      {/* Skip link para acessibilidade */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-[#122d2f]"
      >
        Pular para o conteúdo
      </a>

      <motion.header
        ref={ref}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-20 lg:px-28 xl:px-40',
          'pt-[env(safe-area-inset-top)] transition-[background-color,backdrop-filter,padding,border-color] duration-300',
          scrolled || sheetOpen
            ? 'backdrop-blur-xl bg-[#122d2f]/65 border-b border-white/10 py-2'
            : 'bg-transparent py-6'
        )}
      >
        {/* Borda gradiente sutil sob o header quando scrolled */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-0',
            (scrolled || sheetOpen) && 'opacity-100',
            'bg-gradient-to-r from-transparent via-white/25 to-transparent'
          )}
        />

        <nav className="mx-auto grid max-w-6xl grid-cols-3 items-center">
          {/* esquerda */}
          <div className="hidden md:flex gap-8 lg:gap-12 text-sm tracking-wide">
            {LINKS.slice(0, 3).map(l => (
              <Link key={l.id} href={`#${l.id}`} onClick={(e) => handleNav(e, l.id)} className={linkClass(l.id)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* logo */}
          <div className="hidden md:flex items-center justify-center">
            <motion.button
              animate={{ scale: scrolled ? 0.92 : 1 }}
              transition={{ type: 'tween', duration: 0.25 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                history.replaceState(null, '', '#')
              }}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Ir para o topo"
            >
              <Image
                src="/icons/logo.svg"
                width={72}
                height={72}
                alt="Donaire Cerimonial"
                className="h-12 w-12 object-contain md:h-[68px] md:w-[68px]"
                priority
              />
            </motion.button>
          </div>

          {/* direita */}
          <div className="hidden md:flex justify-end gap-8 lg:gap-12 text-sm tracking-wide">
            {LINKS.slice(3).map(l => (
              <Link key={l.id} href={`#${l.id}`} onClick={(e) => handleNav(e, l.id)} className={linkClass(l.id)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* mobile */}
          <div className="md:hidden col-span-3 flex justify-between items-center">
            {/* mini logo tocável */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                history.replaceState(null, '', '#')
              }}
              aria-label="Ir para o topo"
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Image src="/icons/logo.svg" width={40} height={40} alt="Donaire Cerimonial" className="h-10 w-10" />
            </button>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger aria-label="Abrir menu" className="rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                <Menu className="text-white w-6 h-6" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0f1f20] text-white border-l border-white/10 p-6 space-y-4 data-[state=open]:animate-in"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-3 text-lg">
                  {LINKS.map(l => (
                    <SheetClose asChild key={l.id}>
                      <Link
                        href={`#${l.id}`}
                        onClick={(e) => handleNav(e, l.id)}
                        className={cn(
                          'block rounded-md px-2 py-2',
                          'hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                          active === l.id && 'bg-white/5'
                        )}
                      >
                        {l.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </MotionConfig>
  )
}
