import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Zoom, Navigation } from 'swiper/modules'
import { STORAGE_BASE_URL } from '../utils/storage'
import 'swiper/swiper-bundle.css'

interface ImageZoomModalProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export default function ImageZoomModal({
  images,
  initialIndex,
  onClose,
}: ImageZoomModalProps) {
  const startY = useRef<number | null>(null)

  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const CLOSE_THRESHOLD = 140

  function handleTouchStart(e: React.TouchEvent) {
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (startY.current === null) return

    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current

    // Só deixa arrastar pra baixo (não pra cima)
    if (diff > 0) {
      setDragY(diff)
    }
  }

  function handleTouchEnd() {
    setIsDragging(false)

    if (dragY > CLOSE_THRESHOLD) {
      setDragY(0)
      onClose()
      return
    }

    // volta pro centro
    setDragY(0)
    startY.current = null
  }

  // Fundo vai ficando mais transparente conforme arrasta
  const opacity = Math.max(0.25, 1 - dragY / 300)

  return (
    <div className="fixed inset-0 z-50 select-none">
      {/* BACKDROP */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${0.9 * opacity})` }}
        onClick={onClose}
      />

      {/* botão X */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 rounded-full bg-black/60 px-4 py-2 text-white text-sm"
      >
        ✕
      </button>

      {/* Conteúdo que desce junto com o dedo */}
      <div
        className="relative z-40 flex h-full w-full items-center justify-center px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 220ms ease',
        }}
      >
        <Swiper
          modules={[Zoom, Navigation]}
          zoom
          navigation
          initialSlide={initialIndex}
          spaceBetween={20}
          className="w-full max-w-md h-[85vh]"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container flex items-center justify-center w-full h-full">
                <img
                  src={STORAGE_BASE_URL + img}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
