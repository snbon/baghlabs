import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CaseGallery({ cases, readMoreLabel = 'Read more', basePath = '' }) {
  const projectsSegment = basePath === '/en' ? 'cases' : 'projecten'
  const [emblaRef, emblaApi] = useEmblaCarousel({
    breakpoints: { '(max-width: 768px)': { dragFree: true } },
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  if (!cases || cases.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">No cases to display.</div>
    )
  }

  return (
    <div className="w-full">
      <div className="container-custom mb-8 flex justify-end gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="disabled:pointer-events-auto"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="disabled:pointer-events-auto"
        >
          <ArrowRight className="size-5" />
        </Button>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex ml-4 md:ml-[max(1rem,calc(50vw-700px+1rem))]">
          {cases.map((item) => (
            <div key={item.id} className="pl-4 min-w-0 shrink-0 basis-[85vw] md:basis-[452px]">
              <Link
                to={item.comingSoon ? '#' : `${basePath}/${projectsSegment}/${item.id}`}
                className={cn('group flex flex-col justify-between', item.comingSoon && 'pointer-events-none')}
              >
                <div>
                  <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                    <div className="flex-1">
                      <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                        <img
                          src={item.image}
                          alt={item.name || item.id}
                          className="h-full w-full object-cover object-center"
                        />
                        {item.comingSoon && (
                          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                            <span className="text-sm font-medium text-bagh-600 uppercase tracking-wide">Coming Soon</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2 line-clamp-2 break-words pt-4 text-lg font-semibold md:text-xl">
                  {item.name || item.id}
                </div>
                <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:text-base">
                  {item.tagline || item.description}
                </div>
                {!item.comingSoon && (
                  <div className="flex items-center text-sm font-medium">
                    {readMoreLabel}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
