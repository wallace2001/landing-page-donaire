'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import { motion, MotionConfig } from 'framer-motion'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        ref={ref}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40",
          "transition-[background-color,backdrop-filter,padding] duration-300",
          scrolled
            ? "backdrop-blur-xl bg-black/50 border-b border-white/15 py-2"
            : "bg-transparent py-6"
        )}
      >
        <nav className="max-w-5xl mx-auto grid grid-cols-3 items-center">
          {/* esquerda */}
          <div className="hidden md:flex gap-10 lg:gap-16 text-sm tracking-wide text-white">
            <Link href="#sobre" onClick={(e) => handleNav(e, 'sobre')} className="hover:text-gold-400 transition">SOBRE</Link>
            <Link href="#equipe" onClick={(e) => handleNav(e, 'equipe')} className="hover:text-gold-400 transition">EQUIPE</Link>
            <Link href="#depoimentos" onClick={(e) => handleNav(e, 'depoimentos')} className="hover:text-gold-400 transition">DEPOIMENTOS</Link>
          </div>

          {/* logo -> leva ao topo */}
          <div className="flex justify-center items-center">
            <motion.button
              animate={{ scale: scrolled ? 0.92 : 1 }}
              transition={{ type: 'tween', duration: 0.25 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <Image
                  src="/icons/logo.png"
                  width={68}
                  height={68}
                  alt="Logo"
                  className="object-contain cursor-pointer"
                />
            </motion.button>
          </div>

          {/* direita */}
          <div className="hidden md:flex justify-end gap-10 lg:gap-16 text-sm tracking-wide text-white">
            <Link href="#trabalhos" onClick={(e) => handleNav(e, 'trabalhos')} className="hover:text-gold-400 transition">TRABALHOS</Link>
            <Link href="#pacotes" onClick={(e) => handleNav(e, 'pacotes')} className="hover:text-gold-400 transition">PACOTES</Link>
            <Link href="#contato" onClick={(e) => handleNav(e, 'contato')} className="hover:text-gold-400 transition">CONTATO</Link>
          </div>

          {/* mobile */}
          <div className="md:hidden col-span-2 flex justify-end ">
            <Sheet>
              <SheetTrigger aria-label="Abrir menu">
                <Menu className="text-white w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-black p-6 space-y-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetClose asChild>
                  <Link href="#sobre" onClick={(e) => handleNav(e, 'sobre')} className="block hover:text-gold-400 transition">SOBRE</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#equipe" onClick={(e) => handleNav(e, 'equipe')} className="block hover:text-gold-400 transition">EQUIPE</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#depoimentos" onClick={(e) => handleNav(e, 'depoimentos')} className="block hover:text-gold-400 transition">DEPOIMENTOS</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#trabalhos" onClick={(e) => handleNav(e, 'trabalhos')} className="block hover:text-gold-400 transition">TRABALHOS</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#pacotes" onClick={(e) => handleNav(e, 'pacotes')} className="block hover:text-gold-400 transition">PACOTES</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#contato" onClick={(e) => handleNav(e, 'contato')} className="block hover:text-gold-400 transition">CONTATO</Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </MotionConfig>
  )
}
