import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function AnimatedTestimonials({
  title = "Wat onze klanten klanten",
  subtitle = "Bekijk wat onze klanten zeggen over samenwerken met Baghlabs.",
  badgeText = "Klantbeoordelingen",
  testimonials = [],
  autoRotateInterval = 6000,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)
    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) return null

  return (
    <section ref={sectionRef} className="bg-noir text-paper border-b border-oxblood">
      <div className="container-wide py-24 md:py-32">
        <div className="flex items-baseline justify-between mb-14 md:mb-20">
          <div>
            <p className="chapter mb-4">Cap. IV, {badgeText}</p>
            <h2 className="poster-2 max-w-[18ch]">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1 transition-all duration-300 ${
                  activeIndex === index ? "w-10 bg-oxblood" : "w-3 bg-noir/25 hover:bg-noir/45"
                }`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-paper/65 italic font-display max-w-2xl mb-14">{subtitle}</p>

        <div className="relative min-h-[280px] md:min-h-[300px] max-w-4xl">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                x: activeIndex === index ? 0 : 40,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ zIndex: activeIndex === index ? 10 : 0 }}
            >
              <div className="frame bg-noir-2 p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center justify-between border-b border-oxblood pb-3 mb-6">
                  <div className="flex gap-1">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-oxblood text-oxblood" />
                    ))}
                  </div>
                  <span className="smallcaps text-paper/40">
                    Nr. {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="relative mb-6 flex-1">
                  <Quote className="absolute -top-1 -left-1 h-6 w-6 text-oxblood/25 rotate-180" />
                  <p className="relative z-10 font-display text-lg md:text-xl leading-snug text-paper/90 pl-3 italic">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-paper/15 pt-4">
                  <Avatar className="h-10 w-10 border border-paper/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-noir-3 text-paper text-sm font-display">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-display font-bold text-base text-paper">{testimonial.name}</p>
                    <p className="smallcaps text-paper/50">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
