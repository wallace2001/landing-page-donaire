'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PageWithPreload({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const images = Array.from(document.images) // pega todas as <img>
    if (images.length === 0) {
      setLoading(false)
      return
    }

    let loaded = 0
    const onImgLoad = () => {
      loaded++
      if (loaded === images.length) {
        setLoading(false) // só libera quando todas carregarem
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        onImgLoad()
      } else {
        img.addEventListener('load', onImgLoad)
        img.addEventListener('error', onImgLoad) // conta erro tbm
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
