'use client'

import { useEffect, useRef, useState } from 'react'

type UseHeroVideoOpts = {
  // versões do vídeo (ajuste os caminhos pro seu /public)
  sources?: {
    hevc1080: string
    webm1080: string
    hevc720?: string
  }
  poster?: string
  observe?: boolean // deixa true p/ só chamar play quando visível
}

export function useHeroVideo(opts?: UseHeroVideoOpts) {
  const {
    sources = {
      hevc1080: '/videos/hero.mp4',
      webm1080: '/videos/hero.mp4',
      hevc720:  '/videos/hero.mp4'
    },
    poster = '/images/hero-poster.jpg',
    observe = true,
  } = opts || {}

  const ref = useRef<HTMLVideoElement | null>(null)
  const [fallback, setFallback] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    // 1) injetar <source> IMEDIATAMENTE (não esperar IO p/ não ficar sem nada)
    // evita injetar duplicado em hot reload
    const already = v.querySelector('source')
    if (!already) {
      const s1 = document.createElement('source')
      s1.src = sources.hevc1080
      s1.type = 'video/mp4; codecs="hvc1"'

      const s2 = document.createElement('source')
      s2.src = sources.webm1080
      s2.type = 'video/webm; codecs="vp9"'

      // opcional 720p (Safari/iOS mais feliz em redes ruins)
      if (sources.hevc720) {
        const s3 = document.createElement('source')
        s3.src = sources.hevc720
        s3.type = 'video/mp4; codecs="hvc1"'
        // sem media query: o browser escolhe pelo primeiro compatível, mantemos 1080 primeiro
        v.append(s1, s2, s3)
      } else {
        v.append(s1, s2)
      }

      // load agora que tem fontes
      try {
        v.load()
      } catch {}
    }

    // 2) flags que garantem autoplay no iOS
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    v.poster = poster

    const tryPlay = () =>
      v.play()
        .then(() => { setReady(true); setFallback(false) })
        .catch(() => { setFallback(true) })

    const onOK = () => setFallback(false)
    const onErr = () => setFallback(true)

    v.addEventListener('loadeddata', tryPlay, { once: true })
    v.addEventListener('canplay', onOK)
    v.addEventListener('playing', onOK)
    v.addEventListener('stalled', onErr)
    v.addEventListener('error', onErr)

    // 3) tenta de novo após um gesto (iOS mais restrito)
    const onTap = () => v.play().catch(() => {})
    window.addEventListener('touchstart', onTap, { once: true, passive: true })

    // 4) só dispara play quando visível (opcional)
    let io: IntersectionObserver | null = null
    if (observe && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
          tryPlay()
          io?.disconnect()
          io = null
        }
      }, { rootMargin: '120px' })
      io.observe(v)
    } else {
      // sem IO, tenta já
      tryPlay()
    }

    return () => {
      v.removeEventListener('canplay', onOK)
      v.removeEventListener('playing', onOK)
      v.removeEventListener('stalled', onErr)
      v.removeEventListener('error', onErr)
      window.removeEventListener('touchstart', onTap)
      io?.disconnect()
    }
  }, [sources.hevc1080, sources.webm1080, sources.hevc720, poster, observe])

  return { ref, fallback, ready }
}
