'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PageWithPreload({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const images = Array.from(document.images) // todas <img>
    const videos = Array.from(document.querySelectorAll('video')) // todos <video>

    const total = images.length + videos.length
    if (total === 0) {
      setLoading(false)
      return
    }

    let loaded = 0
    const onResLoad = () => {
      loaded++
      if (loaded === total) {
        setLoading(false)
      }
    }

    // imagens
    images.forEach((img) => {
      if (img.complete) {
        onResLoad()
      } else {
        img.addEventListener('load', onResLoad)
        img.addEventListener('error', onResLoad)
      }
    })

    // vídeos
    videos.forEach((vid) => {
      if (vid.readyState >= 3) {
        // 3 = HAVE_FUTURE_DATA, já tem dados suficientes para começar
        onResLoad()
      } else {
        vid.addEventListener('loadeddata', onResLoad)
        vid.addEventListener('error', onResLoad)
      }
    })
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-[#1f6568]" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
