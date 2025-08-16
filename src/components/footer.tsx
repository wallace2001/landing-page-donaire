'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white text-[#153b3d] pt-16 pb-8 px-6 sm:px-10 md:px-20 lg:px-32 shadow-inner">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto grid gap-12 md:grid-cols-3"
      >
        {/* Coluna 1 - Logo e descrição */}
        <div className="space-y-4">
          <Image
            src="/icons/logo-gold.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <p className="text-sm leading-relaxed text-[#153b3d]/80">
            Transformando sonhos em celebrações inesquecíveis com sofisticação e amor em cada detalhe.
          </p>
        </div>

        {/* Coluna 2 - Navegação */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navegação</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#about" className="hover:text-[#c9a646] transition">Sobre</Link></li>
            <li><Link href="#services" className="hover:text-[#c9a646] transition">Serviços</Link></li>
            <li><Link href="#portfolio" className="hover:text-[#c9a646] transition">Depoimentos</Link></li>
            <li><Link href="#contact" className="hover:text-[#c9a646] transition">Contato</Link></li>
          </ul>
        </div>

        {/* Coluna 3 - Redes Sociais */}
        <div className='mb-14'>
          <h3 className="text-lg font-semibold mb-4">Conecte-se</h3>
          <div className="flex gap-4">
            <a
              href="https://wa.me/+5561982020697"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#153b3d] hover:bg-[#0f2a2b] p-2 rounded-full transition"
            >
              <FaWhatsapp size={18} color="#fff" />
            </a>
            <a
              href="https://www.instagram.com/donairecerimonial/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c13584] hover:bg-[#a42b70] p-2 rounded-full transition"
            >
              <FaInstagram size={18} color="#fff" />
            </a>
            <a
              href="https://www.facebook.com/donaire.cerimonial"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877f2] hover:bg-[#145dc9] p-2 rounded-full transition"
            >
              <FaFacebookF size={18} color="#fff" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Linha divisória + direitos autorais */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-[#153b3d]/10 pt-6 text-center text-xs text-[#153b3d]/60">
        © {new Date().getFullYear()} Donaire Cerimonial. Todos os direitos reservados.
      </div>
    </footer>
  )
}
