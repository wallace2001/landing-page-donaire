"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, MotionConfig } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Testimonial = {
  author: string;
  date: string;
  title: string;
  body: string;
  avatar?: string;
  rating?: number;
};

const TESTIMONIALS: Testimonial[] = [
  { author: "Karen", date: "Enviado a 18/10/2024", title: "Equipe Donaire", body: "Com certeza foi uma das nossas contratações mais acertadas. Uma equipe totalmente profissional, dedicada, que nos passam total confiança e que sempre estiveram dispostos a tirar todas as nossas dúvidas. A Jéssica é uma benção!", rating: 5 },
  { author: "Carol", date: "Enviado a 24/09/2024", title: "Impecável o trabalho da equipe Donaire", body: "Sou muito grata pelo trabalho incrível da equipe Donaire, eles estiveram comigo desde o início e me ajudaram com muito carinho a organizar cada detalhe do meu sonho. Obrigada por não medir esforços!", rating: 5 },
  { author: "Alice", date: "Enviado a 05/09/2024", title: "Maravilhosos", body: "Equipe muito preparada e especializada, deixaram tudo mais leve no grande dia, extremamente atenciosos e profissionais. Escolheria mais mil vezes! ❤️❤️❤️", rating: 5 },
  { author: "Fernanda", date: "Enviado a 21/07/2024", title: "Cerimonial", body: "Todos da equipe são extremamente profissionais e muito atenciosos. O cuidado para com a noiva e a mãe da mesma no dia foi sem palavras. Jéssica atenciosa aos detalhes e cuidadosa com nosso gosto.", rating: 5 },
];

function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="shrink-0"
          style={{ width: size, height: size }}
          aria-hidden
          {...(i < value
            ? { color: "#f5c451", fill: "#f5c451" }
            : { color: "hsl(var(--muted-foreground))" })}
        />
      ))}
      <span className="ml-2 text-xs font-semibold text-muted-foreground">{value.toFixed(1)}</span>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card className="bg-white border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] rounded-2xl h-full flex flex-col focus-within:ring-2 focus-within:ring-[#F3C64E]/40">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#0f1f20] text-white flex items-center justify-center font-bold overflow-hidden">
              {t.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.avatar} alt={`Foto de ${t.author}`} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm" aria-hidden>{t.author?.[0] ?? "A"}</span>
              )}
            </div>
            <div>
              <p className="font-semibold leading-none text-[#0f1f20]">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.date}</p>
            </div>
          </div>
          <Stars value={t.rating ?? 5} />
        </div>
        <CardTitle className="text-[clamp(18px,2vw,22px)] tracking-tight text-[#0f1f20]">{t.title}</CardTitle>
      </CardHeader>

      <CardContent className="text-[15px] leading-relaxed text-[#23393b]">
        <p className="line-clamp-7 md:line-clamp-8">{t.body}</p>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsCarouselSection() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const perViewLg = 3;
  const ITEMS = useMemo(
    () => (TESTIMONIALS.length <= perViewLg ? [...TESTIMONIALS, ...TESTIMONIALS] : TESTIMONIALS),
    []
  );

  const average = useMemo(() => {
    const vals = TESTIMONIALS.map(t => t.rating ?? 5);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, []);

  const plugin = useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  // bullets + observers
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());

    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // pausa quando sai da viewport
  useEffect(() => {
    if (!api || !plugin.current) return;
    const root = document.querySelector("#depoimentos");
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !prefersReducedMotion) {
          plugin.current.reset();
        } else {
          plugin.current.stop();
        }
      },
      { root: null, threshold: 0.2 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [api, prefersReducedMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <section id="depoimentos" className="relative w-full bg-[#122d2f] py-10 px-6 md:px-12">
        {/* gradientes laterais (fade) para elegância e leitura do corte */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#122d2f] to-transparent/0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#122d2f] to-transparent/0" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          >
          <h2 className="mb-10 text-2xl font-extrabold tracking-tight text-white md:text-4xl">
            Nossos{' '}
            <span className="bg-gradient-to-r from-[#F5BC7B] to-[#E08B5B] bg-clip-text text-transparent">
              Depoimentos
            </span>
          </h2>

            {/* média de avaliações */}
            <div className="flex items-center gap-3 text-white/90">
              <Stars value={average} size={18} />
              <span className="text-xs md:text-sm opacity-90">
                Média baseada em {TESTIMONIALS.length} avaliações
              </span>
            </div>
          </motion.div>

          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            plugins={prefersReducedMotion ? [] : [plugin.current]}
            className="relative w-full"
            onMouseEnter={() => plugin.current?.stop()}
            onMouseLeave={() => !prefersReducedMotion && plugin.current?.reset()}
          >
            <CarouselContent className="-ml-3 md:-ml-6">
              {ITEMS.map((t, idx) => (
                <CarouselItem
                  key={`${t.author}-${idx}`}
                  className="pl-3 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <TestimonialCard t={t} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controles */}
            <CarouselPrevious className="left-1 sm:left-2 bg-black/50 border-white/20 text-white hover:bg-black/70" />
            <CarouselNext className="right-1 sm:right-2 bg-black/50 border-white/20 text-white hover:bg-black/70" />
          </Carousel>

          {/* Bullets acessíveis */}
          {count > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Navegação dos depoimentos">
              {Array.from({ length: count }).map((_, i) => {
                const active = i === selected;
                return (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={active}
                    aria-label={`Slide ${i + 1} de ${count}`}
                    onClick={() => api?.scrollTo(i)}
                    className={[
                      "h-2.5 w-2.5 rounded-full transition-all",
                      active ? "bg-white w-6" : "bg-white/40 hover:bg-white/70",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* JSON-LD (rich snippets) — opcional, melhora SEO de reviews */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product", // ou "LocalBusiness"
              name: "Donaire Cerimonial",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: average.toFixed(1),
                reviewCount: TESTIMONIALS.length,
                bestRating: "5",
                worstRating: "1",
              },
              review: TESTIMONIALS.map((t) => ({
                "@type": "Review",
                author: t.author,
                datePublished: t.date?.replace("Enviado a ", ""),
                name: t.title,
                reviewBody: t.body,
                reviewRating: { "@type": "Rating", ratingValue: t.rating ?? 5, bestRating: "5" },
              })),
            }),
          }}
        />
      </section>
    </MotionConfig>
  );
}
