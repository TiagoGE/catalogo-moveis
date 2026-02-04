import { useState } from 'react'
import { STORAGE_BASE_URL } from '../utils/storage'
import ImageZoomModal from './ImageZoomModal'

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index)
              setOpen(true)
            }}
            className="aspect-square overflow-hidden rounded-xl bg-neutral-200 focus:outline-none"
          >
            <img
              src={STORAGE_BASE_URL + img}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open && (
        <ImageZoomModal
          images={images}
          initialIndex={activeIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
