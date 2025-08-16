'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

type Props = {
  videoId: string
  posterSrc?: string // opcional: passe sua própria imagem
}

const ytThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg` // fallback p/ hqdefault se preferir

export default function YouTubePlayer({ videoId, posterSrc }: Props) {
  const [started, setStarted] = useState(false)

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      mute: 0, // som ligado
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : undefined,
    },
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="relative aspect-video w-full">
        {started ? (
          <YouTube
            key="yt-started"
            videoId={videoId}
            opts={opts}
            className="absolute inset-0 h-full w-full"
            iframeClassName="absolute inset-0 h-full w-full"
            onReady={async (e) => {
              const iframe = await e.target.getIframe()
              const cur = iframe.getAttribute('allow') || ''
              if (!cur.includes('autoplay')) {
                iframe.setAttribute('allow', `${cur}; autoplay; encrypted-media; picture-in-picture`)
              }
            }}
          />
        ) : (
          <div className="absolute inset-0">
            {/* thumbnail sem cinza */}
            <Image
              src={posterSrc ?? ytThumb(videoId)}
              alt="Capa do vídeo"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* botão central com leve glow (sem fundo cinza) */}
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="absolute inset-0 grid place-items-center focus:outline-none"
              aria-label="Iniciar vídeo com som"
            >
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/80 text-white shadow-xl">
                <Play className="ml-0.5 h-8 w-8" />
                {/* pulsar suave */}
                <span className="absolute inset-0 rounded-full animate-ping bg-white/20" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
