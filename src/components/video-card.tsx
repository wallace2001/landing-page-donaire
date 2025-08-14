import { Play } from 'lucide-react'
import Image from 'next/image'

interface VideoCardProps {
  thumbnail: string
  alt: string
}

export default function VideoCard({ thumbnail, alt }: VideoCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
      <Image
        src={thumbnail}
        alt={alt}
        width={400}
        height={300}
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="relative z-10">
          <div className="bg-black/70 rounded-full p-4 animate-pulsePlay">
            <Play className="text-white w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
