'use client'

import { Button } from '@/components/ui/button'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ACCENT = 'from-[#F5BC7B] to-[#E08B5B]'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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
]

export default function ContactSection() {

  const searchParams = useSearchParams();
  const pkgFromUrl = searchParams.get('pkg');

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', locality: '', preferredPackage: '', message: '' },
  })

  const validPkg = useMemo(
    () => (pkgFromUrl && PACKAGE_OPTIONS.includes(pkgFromUrl) ? pkgFromUrl : undefined),
    [pkgFromUrl]
  )

  useEffect(() => {
    if (validPkg) form.setValue('preferredPackage', validPkg, { shouldDirty: true })
  }, [validPkg, form]);

  const onSubmit = (data: FormValues) => {
    const pkg = data.preferredPackage && data.preferredPackage !== '' ? `\nPacote preferido: ${data.preferredPackage}` : ''
    const msg = data.message && data.message.trim() ? `\nMensagem: ${data.message.trim()}` : ''
    const text =
      `Olá, equipe Donaire Cerimonial! 👋\n` +
      `Meu nome é ${data.name} e sou de ${data.locality}.${pkg}\n` +
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 rounded-2xl border-2 border-neutral-200 bg-white p-6 text-neutral-900 shadow-lg"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700">Nome *</FormLabel>
                    <FormControl>
                      <Input
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
                      <Input
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
                  <Select
                    onValueChange={(v) => field.onChange(v === 'none' ? undefined : v)}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 w-full rounded-lg border-2 border-neutral-300 bg-white px-4 text-left text-base focus-visible:border-neutral-500 focus-visible:ring-[3px] focus-visible:ring-neutral-600/20">
                        <SelectValue placeholder="Sem preferência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-neutral-900">
                      {/* se quiser opção para limpar: */}
                      {/* <SelectItem value="none">Sem preferência</SelectItem> */}
                      {PACKAGE_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <Button
              type="submit"
              className="h-12 w-full rounded-lg text-base font-medium bg-[#25D366] hover:bg-[#1fb358]"
            >
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
