'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'

interface ServiceCardProps {
  title: string
  description: string
  image: string
  reverse?: boolean
  local: string;
  date: string;
}

const wrapper: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const imgVariants = (reverse: boolean): Variants => ({
  hidden: { opacity: 0, y: 18, rotate: reverse ? -1.5 : 1.5 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'tween', duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
})

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export function ServiceCard({
  title,
  description,
  image,
  reverse = false,
  local,
  date
}: ServiceCardProps) {
  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={wrapper}
    >
      {/* IMAGEM: igual ao original no desktop; segura no mobile */}
      <motion.div
        variants={imgVariants(reverse)}
        whileHover={{ scale: 1.02, rotate: reverse ? -1 : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className={cn(
          'w-full mx-auto mb-4 rounded', // mobile seguro
          'md:absolute md:z-10 md:w-full md:max-w-3xl md:mx-auto md:-mb-12', // desktop preserva
          reverse ? 'md:-top-15 md:-right-80' : 'md:-top-15'
        )}
      >
        <Image
          src={image}
          alt={title}
          width={1200}
          height={800}
          className={cn(
            'w-full h-auto object-cover border-white border-[5px] rounded-2xl', // mobile
            'md:w-[450px] md:h-[300px]' // desktop igual
          )}
        />
      </motion.div>

      {/* CARD: igual ao original no desktop; mobile sem recuo lateral */}
      <motion.div
        variants={cardVariants}
        className={cn(
          'w-full h-full items-center',
          'flex md:flex',
          reverse ? 'md:justify-start' : 'md:justify-end',
          'justify-center'
        )}
      >
        <Card className="bg-[#fefefe] w-full md:max-w-2xl pt-6 md:pt-20 pb-8 md:pb-10 px-5 md:px-8 text-[#4c3a36]">
          <CardContent
            className={cn(
              'p-0 space-y-4 border-none',
              reverse ? 'md:pr-56' : 'md:pl-56'
            )}
          >
            <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-sm leading-relaxed">{description}</p>
            <div className="w-full h-[1px] bg-[#d6cfc7]" />
            <p className="text-sm text-[#646464] font-semibold tracking-wide underline underline-offset-4 flex items-center gap-2">
              {local} <span className='h-1 w-1 rounded-full bg-[#949494]' /> {date}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
