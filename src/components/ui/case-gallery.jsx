import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
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
      <div className="py-20 text-center smallcaps text-paper/40">
        Geen projecten
      </div>
    )
  }

  const NavBtn = ({ onClick, disabled, children, label }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 rounded-sm border border-paper/25 text-paper/70 hover:text-oxblood hover:border-oxblood disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
    >
      {children}
    </button>
  )

  return (
    <div className="w-full">
      <div className="container-wide mb-8 flex justify-end gap-2">
        <NavBtn onClick={() => emblaApi?.scrollPrev()} disabled={!canScrollPrev} label="Previous">
          <ArrowLeft className="w-4 h-4" />
        </NavBtn>
        <NavBtn onClick={() => emblaApi?.scrollNext()} disabled={!canScrollNext} label="Next">
          <ArrowRight className="w-4 h-4" />
        </NavBtn>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex ml-4 md:ml-[max(1rem,calc(50vw-700px+1rem))]">
          {cases.map((item, i) => (
            <div key={item.id} className="pl-4 min-w-0 shrink-0 basis-[85vw] md:basis-[452px]">
              <Link
                to={item.comingSoon ? '#' : `${basePath}/${projectsSegment}/${item.id}`}
                className={cn('group block', item.comingSoon && 'pointer-events-none')}
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-paper/15 bg-noir-2">
                  <img
                    src={item.image}
                    alt={item.name || item.id}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-noir/85 px-2 py-1 border border-paper/10">
                    <span className="smallcaps text-oxblood">No. {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {item.comingSoon && (
                    <div className="absolute inset-0 bg-noir/85 backdrop-blur-sm flex items-center justify-center">
                      <span className="smallcaps text-paper/70">Binnenkort</span>
                    </div>
                  )}
                </div>
                <div className="pt-5">
                  <h3 className="font-display font-bold text-xl md:text-2xl leading-tight text-paper group-hover:text-oxblood transition-colors line-clamp-2">
                    {item.name || item.id}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-paper/65 line-clamp-2">
                    {item.tagline || item.description}
                  </p>
                </div>
                {!item.comingSoon && (
                  <div className="mt-4 mb-8 flex items-baseline gap-3 smallcaps text-oxblood">
                    <span>{readMoreLabel}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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
