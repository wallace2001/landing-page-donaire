'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER // ex: 5561999999999 (E.164, sem +)

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 👉 função para abrir o WhatsApp com mensagem padrão
  const openWhatsApp = (custom?: string) => {
    const number = WHATSAPP_NUMBER?.replace(/\D/g, '')
    if (!number) {
      console.warn('Defina NEXT_PUBLIC_WHATSAPP_NUMBER no .env (E.164, sem +)')
      return
    }

    // inclui o pacote da URL se existir (?pkg=...)
    const params = new URLSearchParams(window.location.search)
    const pkg = params.get('pkg')

    const base =
      custom ??
      'Olá! Gostaria de mais informações sobre os serviços de cerimonial, valores e disponibilidade.'

    const extra = pkg ? `\nPacote de interesse: ${pkg}` : ''
    const footer = '\n\nEnviado pelo site.'
    const text = `${base}${extra}${footer}`

    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      layout
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3"
      transition={{ layout: { type: 'spring', stiffness: 400, damping: 30 } }}
    >
      {/* WhatsApp */}
      <motion.button
        type="button"
        layout
        onClick={() => openWhatsApp()}
        aria-label="Enviar mensagem no WhatsApp"
        className="rounded-full bg-green-500 p-4 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <FaWhatsapp size={24} />
      </motion.button>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrollTop"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
            className="rounded-full bg-[#153b3d] p-4 text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#102a2b]"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
