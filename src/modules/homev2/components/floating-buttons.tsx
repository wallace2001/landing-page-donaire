'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      layout
      className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50"
      transition={{ layout: { type: 'spring', stiffness: 400, damping: 30 } }}
    >
      {/* WhatsApp: anima posição quando o layout muda */}
      <motion.a
        layout
        href="https://wa.me/SEU_NUMERO?text=Olá,%20quero%20mais%20informações!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enviar mensagem no WhatsApp"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <FaWhatsapp size={24} />
      </motion.a>

      {/* Scroll to top com entrada/saída suave */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrollTop"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao topo"
            className="bg-[#153b3d] hover:bg-[#102a2b] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
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
