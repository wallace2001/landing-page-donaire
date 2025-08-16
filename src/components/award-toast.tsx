'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

export default function AwardFixedImage() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative inline-block">
        {/* Imagem */}
        <Image
          src="/icons/award.png"
          alt="Prêmio 2025"
          width={100}
          height={100}
          className="shadow-lg object-contain"
          priority
        />

        {/* Estrelas */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  )
}
