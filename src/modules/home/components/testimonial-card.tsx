"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import * as React from "react";
import { useMemo } from 'react';

type Testimonial = {
  author: string;
  date: string;
  title: string;
  body: string;
  avatar?: string;
  rating?: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    author: "Karen",
    date: "Enviado a 18/10/2024",
    title: "Equipe Donaire",
    body:
      "Com certeza foi uma das nossas contratações mais acertadas. Uma equipe totalmente profissional, dedicada, que nos passam total confiança e que sempre estiveram dispostos a tirar todas as nossas dúvidas. A Jéssica é uma benção!",
    rating: 5,
  },
  {
    author: "Carol",
    date: "Enviado a 24/09/2024",
    title: "Impecável o trabalho da equipe Donaire",
    body:
      "Sou muito grata pelo trabalho incrível da equipe Donaire, eles estiveram comigo desde o início e me ajudaram com muito carinho a organizar cada detalhe do meu sonho. Obrigada por não medir esforços!",
    rating: 5,
  },
  {
    author: "Alice",
    date: "Enviado a 05/09/2024",
    title: "Maravilhosos",
    body:
      "Equipe muito preparada e especializada, deixaram tudo mais leve no grande dia, extremamente atenciosos e profissionais. Escolheria mais mil vezes! ❤️❤️❤️",
    rating: 5,
  },
  {
    author: "Fernanda",
    date: "Enviado a 21/07/2024",
    title: "Cerimonial",
    body:
      "Todos da equipe são extremamente profissionais E muito muito atenciosos. O cuidado para com a noiva e a mãe da mesma no dia foi sem palavras. A mãe da noiva elogiou todo o cuidado. Jessica atenciosa aos detalhes e cuidadosa com nosso gosto.",
    rating: 5,
  },
];

// Duplicação automática para garantir autoplay mesmo quando a quantidade de slides
// é igual ao número de itens visíveis (ex.: 3 slides e 3 por viewport em lg)

function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? "fill-yellow-400 stroke-yellow-400" : "stroke-muted-foreground"}`}
        />
      ))}
      <span className="ml-2 text-xs font-semibold text-muted-foreground">{value.toFixed(1)}</span>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {

  return (
    <Card className="bg-white border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-2xl h-full flex flex-col">
      <CardHeader className="space-y-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#0f1f20] text-white flex items-center justify-center font-bold">
              {t.avatar ? (
                <img src={t.avatar} alt={t.author} className="h-full w-full object-cover rounded-full" />
              ) : (
                <span className="text-sm">{t.author?.[0] ?? "A"}</span>
              )}
            </div>
            <div>
              <p className="font-semibold leading-none text-[#0f1f20]">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.date}</p>
            </div>
          </div>
          <Stars value={t.rating ?? 5} />
        </div>
        <CardTitle className="text-[22px] md:text-2xl tracking-tight text-[#0f1f20]">{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-[15px] leading-relaxed text-[#23393b] flex-1">
        <p className="line-clamp-6 md:line-clamp-7">{t.body}</p>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsCarouselSection() {
  const plugin = React.useRef(
    Autoplay({
      delay: 6000, // tempo em ms (aqui = 6 segundos entre slides)
      stopOnInteraction: false,
      stopOnMouseEnter: true, // pausa quando mouse passa por cima
    })
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
  } as const;

  const ITEMS: Testimonial[] = useMemo(() => {
  const perViewLg = 3; // lg:basis-1/3
  return TESTIMONIALS.length <= perViewLg ? [...TESTIMONIALS, ...TESTIMONIALS] : TESTIMONIALS;
}, []);

  return (
    <section id="depoimentos" className="w-full bg-[#122d2f] py-20 px-6 md:px-12 relative">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 md:mb-14 text-3xl font-extrabold tracking-tight text-white md:text-5xl"
        >
          Nossos {" "}
          <span className="bg-gradient-to-r from-[#F5BC7B] to-[#E08B5B] bg-clip-text text-transparent">
            Depoimentos
          </span>
        </motion.h2>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]} // autoplay ativado
          className="relative w-full"
          onMouseEnter={plugin.current.stop}  // pausa manual
          onMouseLeave={plugin.current.reset} // volta ao autoplay
        >
          <CarouselContent className="-ml-3 md:-ml-6">
            {ITEMS.map((t, idx) => (
              <CarouselItem
                key={idx}
                className="pl-3 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-[360px] flex">
                  <TestimonialCard t={t} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
