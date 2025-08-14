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
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        ref={ref}
        // Animação de entrada do header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40",
          // transições suaves de padding/cores
          "transition-[background-color,backdrop-filter,padding] duration-300",
          scrolled ? "backdrop-blur-xl bg-black/50 border-b border-white/15 py-2" : "bg-transparent py-6"
        )}
      >
        <nav className="max-w-3xl mx-auto grid grid-cols-3 items-center">
          <div className="hidden md:flex gap-20 text-sm tracking-wide text-white">
            <Link href="#about" className="hover:text-gold-400 transition">SOBRE</Link>
            <Link href="#services" className="hover:text-gold-400 transition">SERVIÇOS</Link>
          </div>

          <div className="flex justify-center items-center">
            <motion.div
              // Animação suave do logo quando scrolled muda
              animate={{ scale: scrolled ? 0.92 : 1 }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <Image
                src="/icons/logo.png"
                width={68}
                height={68}
                alt="Logo"
                className="object-contain"
              />
            </motion.div>
          </div>

          <div className="hidden md:flex justify-end gap-20 text-sm tracking-wide text-white">
            <Link href="#portfolio" className="hover:text-gold-400 transition">DEPOIMENTOS</Link>
            <Link href="#contact" className="hover:text-gold-400 transition">CONTATO</Link>
          </div>

          <div className="md:hidden col-span-3 flex justify-end -mt-18">
            <Sheet>
              <SheetTrigger>
                <Menu className="text-white w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-white p-6 space-y-6">
                <SheetTitle />
                <SheetClose asChild>
                  <Link href="#about" className="block hover:text-gold-400 transition">SOBRE</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#services" className="block hover:text-gold-400 transition">SERVIÇOS</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#portfolio" className="block hover:text-gold-400 transition">DEPOIMENTOS</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#contact" className="block hover:text-gold-400 transition">CONTATO</Link>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </MotionConfig>
  )
}
