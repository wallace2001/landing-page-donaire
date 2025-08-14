'use client'

import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 min-h-screen flex items-center justify-start bg-olive-500 text-white overflow-hidden">
      <Image
        src="/images/hero-banner-principal.jpg"
        alt="Casal"
        width={1920}
        height={1080}
        className="absolute bottom-0 right-0 z-0 object-cover h-full filter grayscale brightness-75"
      />

      <div className="z-10 px-6 md:px-12 max-w-4xl w-full flex flex-col gap-6 items-center text-center md:items-start md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
          Nós Vamos Filmar <br />
          <span className="text-gold-500 text-5xl md:text-7xl">Seu Casamento</span>
        </h1>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
          <Button className="bg-gold-500 text-white cursor-pointer hover:bg-gold-600 px-18 py-8 text-lg font-medium rounded-full">
            Nossos Pacotes
          </Button>

          <button className="flex items-center gap-2 text-white/80 hover:text-white transition text-md">
            <Info size={24}/>
            Conheça Nossa Equipe
          </button>
        </div>

        <p className="text-sm text-white/60 mt-4">
          Arraste para baixo e conheça mais do nosso trabalho.
        </p>

        <div className="mt-6 px-4 py-4 rounded-2xl bg-[#1a1a1a]/70 border border-[#2a2a2a] flex flex-wrap md:flex-nowrap items-center justify-center gap-4 shadow-inner max-w-md w-full">
          <div className="flex -space-x-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-4 ${
                  i === 4
                    ? 'border-[3px] border-white ring-2 ring-offset-2 ring-[#ea9a61]'
                    : 'border-white'
                } shadow-lg`}
              >
                <Image
                  src={`/images/avatar${i + 1}.jpg`}
                  alt={`Membro ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="md:ml-6 text-gold-400 text-2xl font-semibold tracking-wide">
            ★★★★★
          </div>
        </div>
      </div>
    </section>
  )
}
