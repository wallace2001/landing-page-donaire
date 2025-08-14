'use client'

import Image from 'next/image'

interface Wedding {
  initials: string
  names: string
  image: string
}

const weddings: Wedding[] = [
  {
    initials: 'L&N',
    names: 'Liene & Nonato',
    image: '/casamentos/D&D-79.jpeg',
  },
  {
    initials: 'G&E',
    names: 'Giovana & Eduardo',
    image: '/casamentos/061A1976.jpeg',
  },
  {
    initials: 'D&K',
    names: 'Duda & Kauã',
    image: '/casamentos/ANDR1232.jpeg',
  },
]

export default function WorkSection() {
  return (
    <section className="bg-background text-white px-6 md:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Nossos <span className="text-gold-500">Trabalhos</span>
        </h2>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {weddings.map((wedding, index) => (
            <div
              key={index}
              className="relative group rounded-3xl overflow-hidden shadow-xl transition-all duration-500 bg-background-secondary"
            >
              <Image
                src={wedding.image}
                alt={wedding.names}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500 z-10" />

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="text-white text-6xl md:text-7xl font-serif font-bold tracking-wider drop-shadow-2xl">
                  {wedding.initials}
                </span>
              </div>

              <div className="absolute bottom-4 w-full text-center z-30">
                <p className="text-white text-lg font-medium drop-shadow-md">
                  {wedding.names}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
