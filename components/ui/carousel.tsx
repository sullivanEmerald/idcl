import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[]
  thumbnailUrls?: string[]
  contentType: 'image' | 'video'
}

export function Carousel({
  className,
  images,
  thumbnailUrls,
  contentType,
  ...props
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const previousSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div
      className={cn("relative h-full w-full group", className)}
      {...props}
    >
      {contentType === 'image' ? (
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <div className="relative w-full h-full">
          <img
            src={thumbnailUrls?.[currentIndex] || images[currentIndex]}
            alt={`Video thumbnail ${currentIndex + 1}`}
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white border border-white rounded-full p-2">
              Play Video
            </div>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 cursor-pointer">
        <ChevronLeft 
          className="w-6 h-6 text-white bg-black/20 rounded-full p-1" 
          onClick={previousSlide}
        />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 cursor-pointer">
        <ChevronRight 
          className="w-6 h-6 text-white bg-black/20 rounded-full p-1" 
          onClick={nextSlide}
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all",
              currentIndex === index ? "bg-white w-3" : "bg-white/50"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
