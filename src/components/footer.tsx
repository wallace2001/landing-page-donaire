'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

// mesmo endereço do SOBRE; troque se precisar
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.280605492757!2d-47.885932424835644!3d-15.789151284850508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3b02a101f8c1%3A0x3925e510f4280f0f!2sEdif%C3%ADcio%20Number%20One!5e0!3m2!1spt-BR!2sbr!4v1757371045159!5m2!1spt-BR!2sbr';

export default function Footer() {
  return (
    <footer className="bg-white text-[#153b3d] pt-16 pb-8 px-6 sm:px-10 md:px-20 lg:px-32 shadow-inner">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto grid gap-12 md:grid-cols-4"
      >
        {/* Coluna 1 - Logo e descrição */}
        <div className="space-y-4">
          <Image
            src="/icons/logo-gold.svg"
            alt="Logo Donaire Cerimonial"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
          <p className="text-sm leading-relaxed text-[#153b3d]/80">
            Transformando sonhos em celebrações inesquecíveis com sofisticação e amor em cada detalhe.
          </p>
          <p className="text-sm text-[#153b3d]/70">
            <span className="font-semibold">Atendimento:</span> Brasília, Goiás e Tocantins
          </p>
        </div>

        {/* Coluna 2 - Navegação (ids reais das seções) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navegação</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#sobre" className="hover:text-[#c9a646] transition">Sobre</Link></li>
            <li><Link href="#pacotes" className="hover:text-[#c9a646] transition">Pacotes</Link></li>
            <li><Link href="#depoimentos" className="hover:text-[#c9a646] transition">Depoimentos</Link></li>
            <li><Link href="#contato" className="hover:text-[#c9a646] transition">Contato</Link></li>
          </ul>
        </div>

        {/* Coluna 3 - Contato e redes */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold mb-4">Conecte-se</h3>
          <div className="flex gap-4">
            <a
              href="https://wa.me/5561982020697"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#153b3d] hover:bg-[#0f2a2b] p-2 rounded-full transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} color="#fff" />
            </a>
            <a
              href="https://www.instagram.com/donairecerimonial/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c13584] hover:bg-[#a42b70] p-2 rounded-full transition"
              aria-label="Instagram"
            >
              <FaInstagram size={18} color="#fff" />
            </a>
            <a
              href="https://www.facebook.com/donaire.cerimonial"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877f2] hover:bg-[#145dc9] p-2 rounded-full transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} color="#fff" />
            </a>
          </div>

          <div className="mt-4 text-sm">
            <a
              href="https://www.google.com/maps/place/Edif%C3%ADcio+Number+One/@-15.7891513,-47.8859324,17z/data=!3m1!4b1!4m6!3m5!1s0x935a3b02a101f8c1:0x3925e510f4280f0f!8m2!3d-15.7891513!4d-47.8833575!16s%2Fg%2F1tyt6fc0?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              Ver rota no Google Maps
            </a>
          </div>
        </div>

        {/* Coluna 4 — Mapa */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Onde estamos</h3>
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#153b3d]/10 shadow">
            <div className="relative w-full aspect-[16/9] sm:aspect-[4/3]">
              <iframe
                title="Mapa - Donaire Cerimonial"
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                aria-label="Mapa com a localização da Donaire Cerimonial"
              />
            </div>
          </div>
          <p className="mt-3 mb-10 text-xs text-[#153b3d]/70">
            Edifício Number One — Brasília, DF
          </p>
        </div>
      </motion.div>

      {/* Linha divisória + direitos autorais */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-[#153b3d]/10 pt-6 text-center text-xs text-[#153b3d]/60">
        © {new Date().getFullYear()} Donaire Cerimonial. Todos os direitos reservados.
      </div>
    </footer>
  )
}
