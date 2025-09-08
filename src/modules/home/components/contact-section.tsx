'use client'

import { Button } from '@/components/ui/button'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useQuoteStore } from '@/modules/store/quote-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ACCENT = 'from-[#F5BC7B] to-[#E08B5B]'
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

const schema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  locality: z.string().min(2, 'Informe sua cidade/estado'),
  preferredPackage: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const PACKAGE_OPTIONS = [
  'Sem Preferência',
  'Assessoria Completa',
  'Assessoria Parcial Online',
  'Assessoria Final',
  'Pacote Personalizado',
]

export default function ContactSection() {
  const { selectedPackage, setPackage, selectedServices, clearServices } = useQuoteStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', locality: '', preferredPackage: '', message: '' },
  })

  // mantém o select sincronizado com o store
  useEffect(() => {
    if (selectedPackage) form.setValue('preferredPackage', selectedPackage, { shouldDirty: true })
    else form.setValue('preferredPackage', '', { shouldDirty: true })
  }, [selectedPackage, form])

  // ao trocar o pacote no select: atualiza store e reseta serviços se sair do personalizado
  const handlePackageChange = (v?: string) => {
    if (!v || v === 'Sem Preferência') {
      setPackage(undefined)
      clearServices()
      form.setValue('preferredPackage', '', { shouldDirty: true })
      return
    }
    setPackage(v)
    if (v !== 'Pacote Personalizado') {
      clearServices()
    }
    form.setValue('preferredPackage', v, { shouldDirty: true })
  }

  const onSubmit = (data: FormValues) => {
    const pkgLabel = selectedPackage || data.preferredPackage || 'Sem Preferência'

    // monta lista bonita pros serviços selecionados
    const MAX = 12
    const limited = selectedServices.slice(0, MAX)
    const extra = selectedServices.length - limited.length
    const servicesBullet = limited.map(s => `• ${s}`).join('\n')
    const servicesText =
      pkgLabel === 'Pacote Personalizado' && selectedServices.length
        ? `\nServiços escolhidos:\n${servicesBullet}${extra > 0 ? `\n…+${extra} serviço(s)` : ''}`
        : ''

    const pkg =
      pkgLabel && pkgLabel !== 'Sem Preferência'
        ? `\nPacote preferido: ${pkgLabel}`
        : ''

    const msg =
      data.message && data.message.trim()
        ? `\nMensagem: ${data.message.trim()}`
        : ''

    const text =
      `Olá, equipe Donaire Cerimonial! 👋\n` +
      `Meu nome é ${data.name} e sou de ${data.locality}.${pkg}${servicesText}\n` +
      `Gostaria de informações, valores e disponibilidade.\n` +
      `${msg}\n\nEnviado pelo site.`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contato" className="w-full bg-[#122d2f] px-6 pt-6 pb-24 sm:px-12 md:px-24">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-2xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          Fale <span className={`bg-gradient-to-r ${ACCENT} bg-clip-text text-transparent`}>conosco</span>
        </motion.h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 rounded-2xl border-2 border-neutral-200 bg-white p-6 text-neutral-900 shadow-lg">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700">Nome *</FormLabel>
                    <FormControl>
                      <input
                        placeholder="Seu nome completo"
                        {...field}
                        className="h-12 w-full rounded-lg border-2 border-neutral-300 bg-white px-4 text-base focus-visible:border-neutral-500 focus-visible:ring-[3px] focus-visible:ring-neutral-600/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700">Localidade *</FormLabel>
                    <FormControl>
                      <input
                        placeholder="Cidade / Estado"
                        {...field}
                        className="h-12 w-full rounded-lg border-2 border-neutral-300 bg-white px-4 text-base focus-visible:border-neutral-500 focus-visible:ring-[3px] focus-visible:ring-neutral-600/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="preferredPackage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-700">Pacote preferido (opcional)</FormLabel>
                  <Select onValueChange={(v) => handlePackageChange(v)} value={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger className="h-12 w-full rounded-lg border-2 border-neutral-300 bg-white px-4 text-left text-base focus-visible:border-neutral-500 focus-visible:ring-[3px] focus-visible:ring-neutral-600/20">
                        <SelectValue placeholder="Sem preferência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-neutral-900">
                      <SelectItem value="Sem Preferência">Sem Preferência</SelectItem>
                      {PACKAGE_OPTIONS.filter(o => o !== 'Sem Preferência').map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resumo dos serviços quando for personalizado */}
            {selectedPackage === 'Pacote Personalizado' && (
              <div className="rounded-lg border-2 border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-800">
                <div className="mb-2 font-semibold">Serviços selecionados</div>
                {selectedServices.length ? (
                  <>
                    <ul className="ml-4 list-disc space-y-1">
                      {selectedServices.slice(0, 12).map((s, i) => (<li key={i}>{s}</li>))}
                    </ul>
                    {selectedServices.length > 12 && (
                      <div className="mt-2 text-neutral-600">
                        …+{selectedServices.length - 12} serviço(s) adicionais
                      </div>
                    )}
                  </>
                ) : (
                  <div>Nenhum serviço selecionado ainda.</div>
                )}
              </div>
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-700">Mensagem (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte um pouco do que você precisa (data, nº de convidados, igreja, etc.)"
                      {...field}
                      className="min-h-32 w-full rounded-lg border-2 border-neutral-300 bg-white px-4 py-3 text-base focus-visible:border-neutral-500 focus-visible:ring-[3px] focus-visible:ring-neutral-600/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="h-12 w-full rounded-lg text-base font-medium bg-[#25D366] hover:bg-[#1fb358]">
              Enviar pelo WhatsApp
            </Button>

            <p className="text-center text-xs text-neutral-500">
              Abriremos uma conversa no WhatsApp com sua mensagem preenchida.
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}
