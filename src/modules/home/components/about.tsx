'use client'

export default function AboutSection() {
  return (
    <section className="py-8 h-[500px] flex justify-center items-center text-white px-6 md:px-12 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Sobre <span className="text-gold-500">Nós</span>
        </h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Iniciamos nossas atividades no mercado audiovisual primeiramente no ramo institucional,
          porém logo nos fascinamos por produzir vídeos de casamento. Estamos no mercado há mais de
          5 anos eternizando esses momentos especiais. Possuímos equipamentos modernos e uma equipe
          técnica de alta qualidade. Nosso objetivo é captar a personalidade de cada casal para que
          seu vídeo tenha uma identidade única.
        </p>
      </div>
    </section>
  )
}
