'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { useRef, useState } from 'react'

type Props = {
  src: string
  poster?: string
}

export default function VideoWithPlayButton({
  src,
  poster = '/videos/highlight-poster.jpg',
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [started, setStarted] = useState(false)

  const startVideo = async () => {
    const v = videoRef.current
    if (!v) return
    try {
      v.muted = false
      v.volume = 1
      await v.play()
      setStarted(true)
    } catch (e) {
      v.controls = true
      console.error('Falha ao iniciar vídeo:', e)
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <AspectRatio ratio={16 / 9} className="relative">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          playsInline
          loop
          controls={started}
          preload="metadata"
        />

        {!started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 text-white">
            <Button
              type="button"
              onClick={startVideo}
              aria-label="Reproduzir vídeo com som"
              className="h-16 w-16 md:h-20 md:w-20 rounded-full shadow-xl"
              size="icon"
            >
              <Play className="h-8 w-8 md:h-10 md:w-10 translate-x-[2px]" />
            </Button>
            <p className="text-sm md:text-base font-medium">
              Clique para assistir com som
            </p>
          </div>
        )}
      </AspectRatio>
    </div>
  )
}
