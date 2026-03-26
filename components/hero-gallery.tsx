"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const galleryImages = [
  { src: "/display_images/front.png", alt: "CommuteLive front display" },
  { src: "/display_images/side.webp", alt: "CommuteLive side profile" },
  { src: "/display_images/shelf.jpg", alt: "CommuteLive on a shelf" },
  { src: "/display_images/multiple.png", alt: "Multiple CommuteLive display views" },
  { src: "/display_images/app.webp", alt: "CommuteLive companion app view" },
  { src: "/display_images/front.png", alt: "CommuteLive front display alternate" },
]

export function HeroGallery() {
  const [activeImage, setActiveImage] = useState(0)
  const [thumbnailPage, setThumbnailPage] = useState(0)
  const thumbnailsPerPage = 4
  const totalPages = Math.ceil(galleryImages.length / thumbnailsPerPage)
  const current = galleryImages[activeImage]
  const visibleThumbnails = galleryImages.slice(
    thumbnailPage * thumbnailsPerPage,
    thumbnailPage * thumbnailsPerPage + thumbnailsPerPage,
  )

  function handleThumbnailClick(index: number) {
    setActiveImage(index)
  }

  function goToPreviousPage() {
    setThumbnailPage((currentPage) => (currentPage === 0 ? totalPages - 1 : currentPage - 1))
  }

  function goToNextPage() {
    setThumbnailPage((currentPage) => (currentPage === totalPages - 1 ? 0 : currentPage + 1))
  }

  return (
    <div className="grid gap-5">
      <Dialog>
        <DialogTrigger asChild>
          <button className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 text-left shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="aspect-[4/3] min-h-[25rem] w-full overflow-hidden bg-black/40 lg:min-h-[33rem]">
              <Image
                src={current.src}
                alt={current.alt}
                width={2000}
                height={1500}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                priority
              />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl border-white/10 bg-black/95 p-3 sm:p-4">
          <DialogTitle className="sr-only">{current.alt}</DialogTitle>
          <div className="overflow-hidden rounded-2xl bg-black/40">
            <Image
              src={current.src}
              alt={current.alt}
              width={2400}
              height={1600}
              className="h-auto max-h-[85vh] w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goToPreviousPage}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:border-cyan-300/40 hover:text-white"
          aria-label="Previous gallery images"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="grid flex-1 grid-cols-4 gap-4">
          {visibleThumbnails.map((image, visibleIndex) => {
            const actualIndex = thumbnailPage * thumbnailsPerPage + visibleIndex

            return (
              <button
                key={`${image.src}-${actualIndex}`}
                type="button"
                onClick={() => handleThumbnailClick(actualIndex)}
                className={`overflow-hidden rounded-[1.25rem] border transition-all ${
                  activeImage === actualIndex
                    ? "border-cyan-300 shadow-[0_0_24px_rgba(102,240,255,0.22)]"
                    : "border-white/10 bg-black/20"
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={goToNextPage}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:border-cyan-300/40 hover:text-white"
          aria-label="Next gallery images"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setThumbnailPage(index)}
            className={`h-2.5 rounded-full transition-all ${
              thumbnailPage === index ? "w-8 bg-cyan-300" : "w-2.5 bg-white/25"
            }`}
            aria-label={`Go to gallery thumbnail page ${index + 1}`}
          >
          </button>
        ))}
      </div>
    </div>
  )
}
